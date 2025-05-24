export enum MODALS {
	CLIENT_INFO = "CLIENT_INFO",
}

export const modals = {
	[MODALS.CLIENT_INFO]: () => import("../components/modals/ClientInfoModal"),
};
