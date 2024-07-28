import { ImagePickerAsset } from "expo-image-picker"
import { UserType } from "./user.type"

export type VideoType = {
	title?: string
	thumbnail?: ImagePickerAsset 
	prompt?: string
	video?: ImagePickerAsset 
	users?: UserType | null
	[key: string]: any
}
