import NewCustomerButton from "@/components/NewCustomerButton"
import NewCustomerForm from "@/components/NewCustomerForm"
import PageTitle from "@/components/PageTitle"

function NewCustomerPage() {

    return (
        <>
            <div className="flex justify-between">
                <PageTitle title="Nuevo Cliente" backButton />
                <NewCustomerButton />
            </div>
            <NewCustomerForm />
        </>
    )
}

export default NewCustomerPage