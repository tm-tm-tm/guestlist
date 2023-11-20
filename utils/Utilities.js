export const getSegmentColor = (index) => {
    const colors = ['silver', 'lightgray', 'darkgray', 'grey']
    return colors[index % colors.length]
}