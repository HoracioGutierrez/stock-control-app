import { useDialogStore } from "@/stores/generalDialog"
import EditFormContainer from "../EditFormContainer"



type Props = {
  data: any
  userId: string
  hasDetails?: boolean
  hasVariants?: boolean
}
function EditCashRegisterForm({ data, userId }: Props) {
  const { type, id } = useDialogStore((state: any) => state)
  const entityProps = {
    entityType: "cashRegister",
    entityId: id,
    hasDetails: false,
    hasVariants: false,
  }
  return (
    <EditFormContainer {...entityProps} />
  )
}
export default EditCashRegisterForm