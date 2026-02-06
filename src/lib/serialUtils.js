/**
 * Serial Number Generation Utility
 * Format: YYYZZZZXXAAAA
 * 
 * YYY: Device Model/Type (e.g., SD8)
 * ZZZZ: Production Date (YYMM)
 * XX: Last two digits of Batch Number
 * AAAA: Sequential Number (restarts monthly)
 */

/**
 * Extracts the model code from the product name.
 * Assumes the first word or specific patterns.
 * @param {string} productName 
 * @returns {string} Model Code (3-4 chars)
 */
export const getModelCode = (productName) => {
    if (!productName) return "DEV";
    // Example: "SD8 Controller" -> "SD8"
    // Example: "IoT Gateway" -> "IOT"

    const cleanName = productName.trim().toUpperCase();
    const parts = cleanName.split(' ');

    if (parts.length > 0) {
        let code = parts[0].replace(/[^A-Z0-9]/g, '');
        if (code.length >= 2) return code.substring(0, 4); // Allow up to 4 chars if valid
    }

    return "DEV"; // Default fallback
};

/**
 * Parses existing batches to find the highest sequence number for the current month/model.
 * @param {Array} allBatches - List of all batch objects
 * @param {string} modelCode - The target model code
 * @param {string} yymm - The target date string (YYMM)
 * @returns {number} The highest sequence number found (default 0)
 */
export const getLastSequenceNumber = (allBatches, modelCode, yymm) => {
    let maxSeq = 0;

    allBatches.forEach(batch => {
        // We need to check existing serial numbers to find the sequence.
        // Assuming batch.productSr contains a range like "SD82402010001 - SD82402010005"
        // or we check a stored metadata field if available.
        // Since we only store the string range, we have to parse it.

        const serialStr = batch.productSr || "";
        // Regex to match the format: Model(YYY) + Date(ZZZZ) + Batch(XX) + Seq(AAAA)
        // We are looking for the Date part matching our YYMM

        // Construct regex based on components
        // We know ZZZZ is YYMM. 
        // We assume the serial starts with ModelCode

        if (!serialStr) return;

        // Try to extract the ENTIRE serial number to parse
        // "From X to Y" or just "X - Y" or "X, Y"
        // The current format in the system seems to be "From 001 to 005" based on previous file, 
        // BUT we are changing it now. Older batches might have different logic.
        // We should safeguard against non-matching formats.

        // Let's look for patterns that look like our new format:
        // Model + YYMM + ...

        // Heuristic: serials usually appear in the string.
        const matches = serialStr.match(new RegExp(`${modelCode}${yymm}\\d\\d(\\d{4})`, 'g'));

        if (matches) {
            matches.forEach(match => {
                // match is like SD82402010001
                // Extract last 4 digits
                const seq = parseInt(match.slice(-4), 10);
                if (!isNaN(seq) && seq > maxSeq) {
                    maxSeq = seq;
                }
            });
        }
    });

    return maxSeq;
};

/**
 * Generates the serial number string for a new batch.
 * @param {string} productName 
 * @param {string} batchNo 
 * @param {Date} date 
 * @param {number} startSequence - The sequence number to start from (e.g. 1)
 * @param {number} quantity - Number of devices
 * @returns {string} Formatted range string (e.g., "SD82407010001 - SD82407010005")
 */
export const generateSerialNumberRange = (productName, batchNo, date, startSequence, quantity) => {
    if (!quantity || quantity <= 0) return "N/A";

    const modelCode = getModelCode(productName);

    // YYMM
    const yy = date.getFullYear().toString().substring(2);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const yymm = `${yy}${mm}`;

    // Batch suffix (last 2 chars)
    // If batchNo is "BAT-2024-1234", we want "34"? Or just a hash?
    // User requirement: "XX: Last two digits of Batch Number"
    let batchSuffix = "00";
    if (batchNo && batchNo.length >= 2) {
        batchSuffix = batchNo.trim().slice(-2).replace(/[^0-9]/g, '00'); // Ensure digits or default
        if (batchSuffix.length < 2) batchSuffix = batchSuffix.padStart(2, '0');
    }

    const startSeqStr = startSequence.toString().padStart(4, '0');
    const endSequence = startSequence + quantity - 1;
    const endSeqStr = endSequence.toString().padStart(4, '0');

    const startSerial = `${modelCode}${yymm}${batchSuffix}${startSeqStr}`;
    const endSerial = `${modelCode}${yymm}${batchSuffix}${endSeqStr}`;

    if (quantity === 1) {
        return startSerial;
    }

    return `${startSerial} - ${endSerial}`;
};

/**
 * Expands a serial number range string into an array of individual serial numbers.
 * @param {string} rangeStr - The range string (e.g., "SD82407010001 - SD82407010005")
 * @param {number} quantity - Expected quantity (fallback)
 * @returns {string[]} Array of serial numbers
 */
export const expandSerialNumberRange = (rangeStr, quantity) => {
    if (!rangeStr) return [];

    // Case 1: Single Serial Number (no " - " separator)
    if (!rangeStr.includes(" - ")) {
        return [rangeStr];
    }

    // Case 2: Range
    const parts = rangeStr.split(" - ");
    if (parts.length !== 2) return [rangeStr]; // Fallback

    const startSerial = parts[0].trim();
    const endSerial = parts[1].trim();

    // Extract the sequential part (last 4 digits)
    // Assuming format from generateSerialNumberRange: ...AAAA
    const prefix = startSerial.slice(0, -4);
    const startSeq = parseInt(startSerial.slice(-4), 10);
    const endSeq = parseInt(endSerial.slice(-4), 10);

    // Validation: Prefix should match
    if (!endSerial.startsWith(prefix) || isNaN(startSeq) || isNaN(endSeq)) {
        // If parsing fails, just return what we have or generate based on qty if needed.
        // For now, return start and end as markers if logic fails.
        return [startSerial, endSerial];
    }

    const list = [];
    for (let i = startSeq; i <= endSeq; i++) {
        list.push(`${prefix}${i.toString().padStart(4, '0')}`);
    }

    return list;
};
