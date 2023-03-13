import { Value } from "naive-ui/es/date-picker/src/interface";

interface Driver {
  _id: string | null;
  name: string;
  surname: string;
  hiringDate: Value | null | undefined;
  license: string;
  licenseExpirationDate: Value | null | undefined;
  permanentContract: string | number | undefined;
  contractExpiration: Value | null | undefined;
}

export default Driver;