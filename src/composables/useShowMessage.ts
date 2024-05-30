export function useShowMessage(type: 'red' | 'green', message: string, title?: string) {
    // @ts-ignore
    show_message(type, message, title)
}