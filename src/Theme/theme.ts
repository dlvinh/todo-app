export type ThemeType = typeof light;

export const light = {
    primary: "#f45511",
    text: "black",
    background: "#FCEFD5",
    header: "#DB7093",
}

export const dark: ThemeType = {
    primary: "#111111",
    text: "#DB7093",
    background: "rgb(0 49 86 / 90%)",
    header: "#DB7093",
}

const theme = light;
export default theme;