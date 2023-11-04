import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Section,
    Text,
    Button,
    Hr,
    Preview
} from '@react-email/components';

const EmailTemplate = ({ url, host }) => (
    <Html>
        <Head />
        <Preview>Sign in to {host}</Preview>

        <Body style={main}>
            <Container style={container}>

                <Hr />

                <Button
                    href={url}
                    style={button}
                >
                    <Text style={label} >
                        SIGN IN
                    </Text>
                </Button>

            </Container>
        </Body>
    </Html>
);

export default EmailTemplate

const main = {
    backgroundColor: '#000',
    fontFamily: 'Inter,HelveticaNeue,Helvetica,Arial,sans-serif',
};

const container = {
    backgroundColor: '#fff',
    border: '0.4px solid #eee',
    borderRadius: '4px',
    boxShadow: '0 2px 2px rgba(200,200,200,.5)',
    width: '360px',
    textAlign: 'center',
    margin: '1em auto'
};

const logo = {
    marginTop: '1em',
    margin: '1em auto',
};

const label = {
    color: '#000',
    fontSize: '14px',
    margin: '0.6em 0',
    textAlign: 'center',
}

const button = {
    color: '#000',
    background: '#cdcdcd',
    display: 'flex',
    borderRadius: '5px',
    // fontSize: '32px',
    // fontWeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
    // height: '4em',
    width: '96%',
    textAlign: 'center',
    margin: '1em auto'
};


