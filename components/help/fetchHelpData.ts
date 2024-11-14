import { getHelpData } from "@/actions/help/getHelpData";


export async function fetchHelpData() {
    const { data, error, message } = await getHelpData();
    if (error) {
        return { data: [], error, message }
    }
    return { data, error, message }
}