import { UserType } from "./user.type"

export type VideoType = {
	title?: string
	thumbnail?: string
	prompt?: string
	video?: string
	users?: UserType
	[key: string]: any
}
