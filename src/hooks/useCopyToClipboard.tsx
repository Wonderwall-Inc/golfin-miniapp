import { useState } from 'react'

const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false)

    const copytoClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content)
            setIsCopied(true)
        } catch (error) {
            setIsCopied(false)
            console.error('Unable to copy', error)
        }
    }

    return { isCopied, copytoClipboard }
}
export default useCopyToClipboard