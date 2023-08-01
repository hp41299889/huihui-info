import {
  Client,
  Product,
} from "@/app/home/collection/background-management-system/client-order-management/interface";

export type FormType = "create" | "edit" | "delete";

export interface FormProps {
  open: boolean;
  type: FormType;
  data: any;
  onClose: () => void;
  afterAction: () => Promise<void>;
}

export interface ClientFormProps extends FormProps {
  data: Client | undefined;
}

export interface ProductFormProps extends FormProps {
  data: Product | undefined;
}
