import { Value } from "naive-ui/es/date-picker/src/interface";
interface Customer {
  _id: string | null;
  ragioneSociale: string;
  pIva: string;
  contatto: string | null;
  numeroTelefono: string;
  dataInizioCollaborazione: Value | null | undefined;
}

export default Customer;