export default function style(width = 250, height = 100) {
    return `
        p {
            text-indent: 10px;
        }

        img {
            width: ${width}px;
            height: ${height}px;
        }
    `;
}
