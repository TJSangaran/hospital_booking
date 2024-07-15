import MeetingCore from "./MeetingCore";
import generateMuiTheme from "./mui/theme";
import { ThemeProvider } from "@material-ui/styles";
import './index.css'

const Meeting = () => {
    return (
        <ThemeProvider theme={generateMuiTheme()}>
            <MeetingCore />
        </ThemeProvider>
    );
}

export default Meeting;