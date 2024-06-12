import { GeneralResponse } from "@/lib/types"
import { db, customers} from "@/schema"
import { asc } from "drizzle-orm"

export const getAllCustomers = async (): Promise<GeneralResponse> => {
    try {
        const customersFromDb = await db.select().from(customers).orderBy(asc(customers.name))
        return {
            data: customersFromDb,
            error: null,
            message: "Customers found"
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message,
                message: "Error getting customers"
            }
        }
        
        return {
            data: null,
            error: "Error getting customers",
            message: "Error getting customers"
        }
    }
}