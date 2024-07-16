import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@mui/material/StepContent";
import Step from "@mui/material/Step";
import Stepper from "@mui/material/Stepper";
import ContactDetails from './component/ContactDetails';
import CollegeDetails from './component/CollegeDetails';
import Other from './component/Other';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ValidationStep from './ValidationStep';
import { getCollegeAffliateApprove, preopertyForm } from '../../../../redux/Action/PropertyTypeAction';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export function StepForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const ValidationSchemaStep = ValidationStep[activeStep];
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
       
        setActiveStep(0);
        formik.resetForm();
    };

 


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "email": "",
            "phone": "",
            "website": "",
            "edu_type": "",
            "college_type": "",
            "name": "",
            "short_name": "",
           
            "est_year": "",
            "approve_by": [],
            "affilite_by": [],
            "logo": "",
            "featured_img": [],
            "broucher": "",
            "podcast_hindi": "",
            "podcast_eng": "",
            "info_video_link":"",
            "application_link":""
        },
        validationSchema: ValidationSchemaStep,
        onSubmit: values => {
            console.log(values, "values")
            handleNext();
            let formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
              console.log(key, value, "key, value")
              if (key == "approve_by" || key == "affilite_by" ) {
               
                formData.append(key, JSON.stringify(value));
              }else if(key == "featured_img"){
                for (let i=0;i<value?.length;i++) {
                    formData.append("featured_img",value[i]);
                }
              } else {
              
                formData.append(key, value);
              }
      
            }
      
      

            if(activeStep == 2){
                dispatch(preopertyForm(formData,navigate));
            }
           
            //dispatch(createStatus(values));
        },
    });

    //VerticalOrientationWizard
    const steps = [
        {
            label: "Contact Details",
            description: (
                <ContactDetails formik={formik} />
            ),
        },
        {
            label: "College/University Details",
            description: (
                <CollegeDetails formik={formik} />
            ),
        },
        {
            label: "Other Details ",
            description: (
                <Other formik={formik} />
            ),
        },
    ];

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? <Typography variant="caption"></Typography> : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <form onSubmit={formik.handleSubmit}>
                                <Typography>{step.description}</Typography>

                                <Box sx={{ mb: 2 }}>
                                    <div className="buts">
                                        <Button
                                            className="me-2 mt-2"
                                            type="submit"
                                            //  onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? "Finish" : "Continue"}
                                        </Button>
                                        <Button
                                            className="me-2 mt-2"
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>&nbsp;&nbsp;
                                    </div>
                                </Box>
                            </form>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button
                        className="me-2 resets mt-2"
                        onClick={handleReset}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Reset
                    </Button>&nbsp;&nbsp;
                </Paper>
            )}
        </Box>
    );
}