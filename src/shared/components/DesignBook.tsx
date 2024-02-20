import { ReactElement } from 'react';
import { Formik } from 'formik';
import {
    AppPrimaryButton,
    AppSecondaryButton,
    AppPrimaryButtonOutlined,
    AppTeritaryButton,
    AppFormikTextField,
    AppFormikTextArea,
    AppDarkButton,
} from './AppComponents';
import { Container, Grid, Box, Typography, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const DesignBook = (): ReactElement => (
    // UI Elements
    <Container maxWidth="md">
        <Grid id="design-book" container>
            <Grid item xs={12}>
                <Box my={2}>
                    <Typography variant="h4">Typography</Typography>
                    <Divider />
                </Box>
                <Typography variant="h1">Heading H1</Typography>
                <Typography variant="h2">Heading H2</Typography>
                <Typography variant="h3">Heading h3</Typography>
                <Typography variant="h4">Heading h4</Typography>
                <Typography variant="h5">Heading h5</Typography>
                <Typography variant="h6">Heading h6</Typography>
                <Typography variant="body1">Body 1</Typography>
                <Typography variant="body2">Body 2</Typography>
                <Typography variant="caption">Caption</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box mt={2}>
                    <Box my={2}>
                        <Typography variant="h2">Text Field</Typography>
                        <Divider />
                    </Box>
                    <Formik
                        initialValues={{
                            smallInput: 'Small Input',
                            largeInput: 'Large Input',
                            password: '',
                            multiLine: 'Multiline',
                            readOnly: 'Read only',
                        }}
                        enableReinitialize
                        onSubmit={() => {
                            console.log('');
                        }}
                    >
                        {() => (
                            <Grid item xs={12}>
                                <AppFormikTextField
                                    name="smallInput"
                                    label="Small Input"
                                    size="small"
                                />
                                <AppFormikTextField
                                    name="largeInput"
                                    label="Large Input"
                                    size="medium"
                                />
                                <AppFormikTextField
                                    name="readOnly"
                                    label="Read only"
                                    size="medium"
                                    readOnly
                                />
                                <AppFormikTextField
                                    name="password"
                                    label="Password"
                                    size="medium"
                                    type="password"
                                />
                                <AppFormikTextArea
                                    name="multiLine"
                                    label="Multi Line"
                                    rows={4}
                                />
                            </Grid>
                        )}
                    </Formik>
                </Box>
                <Box mt={2}>
                    <Box my={2}>
                        <Typography variant="h3">Buttons</Typography>
                        <Divider />
                    </Box>
                    <Typography variant="h4">Primary Button</Typography>
                    <AppPrimaryButton title="Primary Button" />
                    <AppPrimaryButton title="Primary Button" isLoading />
                    <AppPrimaryButton
                        title="Primary Button"
                        isLoading
                        disabled
                    />
                    <AppPrimaryButton
                        title="Primary Button With Icon"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppPrimaryButton
                        title="Small Button"
                        className="btn-small"
                    />
                    <AppPrimaryButton
                        title="Small Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />

                    <AppPrimaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                    />
                    <AppPrimaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                        isLoading
                    />

                    <AppPrimaryButton title="Primary Button" disabled />
                </Box>
                <Box mt={2}>
                    <Typography variant="h4">Secondary Button</Typography>
                    <AppSecondaryButton
                        className="btn-secondary-outlined"
                        title="Secondary Button"
                    />
                    <AppSecondaryButton
                        className="btn-secondary-outlined"
                        title="Secondary Button"
                        isLoading
                    />
                    <AppSecondaryButton
                        title="Secondary Button With Icon"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppSecondaryButton
                        title="Small Button"
                        className="btn-small"
                    />
                    <AppSecondaryButton
                        title="Small Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppSecondaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                    />
                    <AppSecondaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                        isLoading
                    />
                    <AppSecondaryButton
                        disabled
                        title="Disabled Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                </Box>

                <Box mt={2}>
                    <Typography variant="h4">
                        Primary Button Outlined
                    </Typography>
                    <AppPrimaryButtonOutlined title="Primary Button Outlined" />
                    <AppPrimaryButtonOutlined
                        title="Primary Button Outlined"
                        isLoading
                    />
                    <AppPrimaryButtonOutlined
                        title="Primary Button Outlined With Icon"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppPrimaryButtonOutlined
                        title="Small Button"
                        className="btn-small"
                    />
                    <AppPrimaryButtonOutlined
                        title="Small Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppPrimaryButtonOutlined
                        title="Extra Small Button"
                        className="btn-extra-small"
                    />
                    <AppPrimaryButtonOutlined
                        title="Extra Small Button"
                        className="btn-extra-small"
                        isLoading
                    />
                    <AppPrimaryButtonOutlined
                        title="Primary Button Outlined"
                        disabled
                    />
                </Box>

                <Box mt={2}>
                    <Typography variant="h4">Teritary Button</Typography>
                    <AppTeritaryButton title="Teritary Button" />
                    <AppTeritaryButton title="Teritary Button" isLoading />
                    <AppTeritaryButton
                        title="Teritary Button With Icon"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppTeritaryButton
                        title="Small Button"
                        className="btn-small"
                    />
                    <AppTeritaryButton
                        title="Small Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppTeritaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                    />
                    <AppTeritaryButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                        isLoading
                    />
                    <AppTeritaryButton title="Teritary Button" disabled />
                </Box>

                <Box mt={2}>
                    <Typography variant="h4">Dark Button</Typography>
                    <AppDarkButton title="Dark Button" />
                    <AppDarkButton title="Dark Button" isLoading />
                    <AppDarkButton
                        title="Dark Button With Icon"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppDarkButton title="Small Button" className="btn-small" />
                    <AppDarkButton
                        title="Small Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                    <AppDarkButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                    />
                    <AppDarkButton
                        title="Extra Small Button"
                        className="btn-extra-small"
                        isLoading
                    />
                    <AppDarkButton
                        disabled
                        title="Disabled Button"
                        className="btn-small"
                        endIcon={<ArrowForwardIcon />}
                    />
                </Box>
            </Grid>
        </Grid>
    </Container>
);
export default DesignBook;
