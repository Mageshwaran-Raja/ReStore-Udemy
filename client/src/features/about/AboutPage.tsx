import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){

    const [validationError, setValidationError] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log("can't see me"))
            .catch(error => setValidationError(error))
    }

    return(
        <Container>
            <Typography gutterBottom variant='h2'>Errors for Testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>
                    Test 400 Error
                </Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>
                    Test 401 Error
                </Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>
                    Test 404 Error
                </Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>
                    Test 500 Error
                </Button>
                <Button variant="contained" onClick={getValidationError}>
                    Test Validation Error
                </Button>
            </ButtonGroup>
            {validationError.length > 0 && 
                <Alert severity="error">
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>
                        {validationError.map(err => (
                            <ListItem>
                                <ListItemText>{err}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}