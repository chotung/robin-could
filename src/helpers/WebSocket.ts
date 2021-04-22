import key from "../secrets"

export const webSocketAction = (action:string, params:string) => {
	return JSON.stringify({ action, params })
}

export const createWebSocket = (url:string) => {
	return new WebSocket(url)
}