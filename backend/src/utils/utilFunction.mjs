export const checkName = (chatName, data) => {
    let exists = false;
    let i = 0;

    for (const chat of data) {
        if (chatName === chat.name) {
            exists = true;
            break;
        }
    }

    if(!exists) return chatName;

    while (exists) {
        i++;
        exists=false;

        for (const chat of data) {
            if (chatName + " " + i == chat.name) {
                exists = true;
                break;
            }
        }
    }

    return chatName + " " + i;
}