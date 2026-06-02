import { SupportedLanguages } from '../../interfaces.d.ts'

export type FileFunction = (lang: SupportedLanguages) => Promise<any>
