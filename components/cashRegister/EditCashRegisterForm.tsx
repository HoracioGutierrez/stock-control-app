import EditFormContainer from "../EditFormContainer"

type Props = {
  id: string
  userId: string
}
function EditCashRegisterForm({ id, userId }: Props) {
  return (
    <EditFormContainer entity="cash-register" barcode={id} userId={userId} hasVariants={false} data={id} />
  )
}
export default EditCashRegisterForm