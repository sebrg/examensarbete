import env from "dotenv";

env.config()

const {
    fbApiKey,
    fbAuthDomain,
    fbProjectId,
    fbStorageBucket,
    fbMessagingSenderId,
    fbAppId,
    fbMeasurementId
} = process.env


const fbSettings = {
    apiKey: fbApiKey,
    authDomain: fbAuthDomain,
    projectId: fbProjectId,
    storageBucket: fbStorageBucket,
    messagingSenderId: fbMessagingSenderId,
    appId: fbAppId,
    measurementId: fbMeasurementId
}

export const config = {
    fbSettings,
}