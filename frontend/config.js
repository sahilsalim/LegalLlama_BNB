export let exportingVariable = 0
export let currentUserAddress = "";

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    currentUserAddress = accounts[0];
}