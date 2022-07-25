export const useMonoxide = (status) => {
    let circleColor, backgroundColor, statusMessage
    if (status === 'green') {
        circleColor = "#10F500"
        backgroundColor = "#BFFAC1"
        statusMessage = "Ok"
    } else if (status === 'yellow') {
        circleColor = "#F5E600"
        backgroundColor = "#FAEE9B"
        statusMessage = "Alert"
    } else {
        circleColor = "#F51701"
        backgroundColor = "#FAB2AC"
        statusMessage = "Dangerous"
    }
    return [backgroundColor, circleColor, statusMessage]
}
