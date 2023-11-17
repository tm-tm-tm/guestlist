export const getSegmentColor = (index) => {
    const colors = ['silver', 'lightgray']
    return colors[index % colors.length]
}