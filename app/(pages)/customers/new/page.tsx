import NewClientButton from "@/components/NewClientButton"
import NewClientForm from "@/components/NewClientForm"
import PageTitle from "@/components/PageTitle"

function NewClientPage() {

    return (
        <>
            <div className="flex justify-between">
                <PageTitle title="Nuevo Cliente" backButton/>
                <NewClientButton />
            </div>
            <NewClientForm />
        </>
    )
}

export default NewClientPage