import { config } from "dotenv";
import { GeocodeAPIClass } from "../GeocodeAPIClass";
import { GeocodeAdapter } from "../GeocodeAdapter";

config();

async function runLearningTests() {
    const apiClient = new GeocodeAPIClass();
    const adapter = new GeocodeAdapter(apiClient);

    console.log("Learning Test: Valid City");
    const result1 = await adapter.getCoordinates("Jaipur");
    console.log(result1);

    console.log("Learning Test: Invalid City");
    const result2 = await adapter.getCoordinates("abc12");
    console.log(result2);

    console.log("Learning Test: Empty Input");
    const result3 = await adapter.getCoordinates("");
    console.log(result3);
}

runLearningTests().catch(err => {
    console.error("Learning test failed:", err);
});
