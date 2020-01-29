/**
 * Parvez M Robin
 * this@parvezmrobin.com
 * Date: Nov 18, 2019
 */

const CAPTURE = 'CAPTURE';

export const capture = imageUri => ({
  type: CAPTURE,
  imageUri,
});

export default {CAPTURE};
