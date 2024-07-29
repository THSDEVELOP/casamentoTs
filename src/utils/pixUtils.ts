// src/utils/pixUtil.ts
export const generatePIXPayload = (
    pixKey: string,
    merchantName: string,
    merchantCity: string,
    amount: string
  ): string => {
    const payloadFormatIndicator = '000201';
    const pointOfInitiationMethod = '010212';
    const merchantAccountInformation = `26${formatField('00', 'br.gov.bcb.pix')}${formatField('01', pixKey)}`;
    const merchantCategoryCode = '52040000';
    const transactionCurrency = '5303986';
    const transactionAmount = formatField('54', amount);
    const countryCode = '5802BR';
    const merchantNameField = formatField('59', merchantName);
    const merchantCityField = formatField('60', merchantCity);
    const additionalDataFieldTemplate = '62070503***';
    const crc16 = '6304';
  
    const payloadWithoutCRC = `${payloadFormatIndicator}${pointOfInitiationMethod}${merchantAccountInformation}${merchantCategoryCode}${transactionCurrency}${transactionAmount}${countryCode}${merchantNameField}${merchantCityField}${additionalDataFieldTemplate}${crc16}`;
  
    const crc = calculateCRC16(payloadWithoutCRC);
    return `${payloadWithoutCRC}${crc}`;
  };
  
  const formatField = (id: string, value: string): string => {
    const length = value.length.toString().padStart(2, '0');
    return `${id}${length}${value}`;
  };
  
  const calculateCRC16 = (payload: string): string => {
    let crc = 0xFFFF;
    const polynomial = 0x1021;
  
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ polynomial;
        } else {
          crc <<= 1;
        }
      }
    }
  
    crc &= 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
  };
  