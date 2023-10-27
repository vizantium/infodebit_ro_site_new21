'use client'
import { createTheme } from '@mui/material/styles';
const infoBlue = "#0795fe !important"

export default createTheme({
    palette: {
        common: {
            infoBlue: infoBlue
        }
    },
    primary: {
        main: infoBlue,
    },
    typography: {
        tab: {
            textTransform: "none !important",
            fontWeight: "700",
            fontSize: "1rem !important"
        }
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    borderColor: infoBlue,
                    borderWidth: 2
                },
                body: {
                    borderColor: infoBlue,
                    borderWidth: 2
                }
            }
        },
    }
});