import { AppDataSource } from "../../database/mongoDB.js"
import { ApiKey } from "../../models/apikeys.model.js"

const apiKeyRepository = AppDataSource.getMongoRepository(ApiKey)

/**
 * 
 * Verify if the apikey is valid or not.
 */
export const verifyApiKey = async (apikey: string) => {
    try {
        const apiKeyRecord = await apiKeyRepository.findOneBy({
            key: apikey,
            isActive: true,
        });

        return apiKeyRecord ? true : false;

    } catch(err){

        console.log({ err })
    }
}