export const formatDate = (data: string): string => {
    const date = new Date(data)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return date.toLocaleDateString('us-US', options)
}


