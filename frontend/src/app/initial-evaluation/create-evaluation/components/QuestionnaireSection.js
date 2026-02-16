import React from "react";
import {
    Card,
    CardContent,
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
} from "@mui/material";
import { Assignment } from "@mui/icons-material";

const questions = [
    { id: "q1", text: "Is the company ISO certified?", hasCertificate: true },
    { id: "q2", text: "If no, is the certification being pursued?" },
    { id: "q3", text: "Does the Quality System include procedures in the form of manuals or formal instructions that have been approved by management?" },
    { id: "q4", text: "Is the Quality System documentation periodically reviewed, updated, and approved by upper management?" },
    { id: "q5", text: "Is there a written quality policy?" },
    { id: "q6", text: "Are internal quality audits performed?" },
    { id: "q7", text: "Does the management review audit results?" },
    { id: "q8", text: "Is there a corrective and preventive action system in place?" },
    { id: "q9", text: "Are customer requirements formally reviewed?" },
    { id: "q10", text: "Do the new designs or changes to existing designs undergo a review process?" },
    { id: "q11", text: "Is there a written system to incorporate customer drawing changes into work order instructions?" },
    { id: "q12", text: "Do you evaluate your supplier's ability to deliver conforming goods and/or services? Will you provide certificates of conformity, if needed?" },
    { id: "q13", text: "Are lot numbers of raw materials and finished goods documented and assigned when appropriate?" },
    { id: "q14", text: "Is traceability by lot identification and inspection status maintained for finished products?" },
    { id: "q15", text: "Are all manufacturing activities controlled through the use of written instructions?" },
    { id: "q16", text: "Is an appropriate inspection performed during or following manufacturing to maintain the level of quality throughout the entire process, including shipping?" },
    { id: "q17", text: "Do materials in the storage areas show evidence of inspection acceptance?" },
    { id: "q18", text: "Are inspection records kept on file?" },
    { id: "q19", text: "Is there a system in place to assure that the calibration program occurs at a regular interval?" },
    { id: "q20", text: "Are all non-conforming materials (raw material, in-process, and completed) labeled and held in a designated area?" },
    { id: "q21", text: "Is employee training documented?" },
    { id: "q22", text: "Are statistical methods being used for production monitoring? If yes, please describe:", hasDescription: true },
    { id: "q23", text: "Are customer return/service policies documented?" },
    { id: "q24", text: "A copy of the company's Quality Manual is attached." },
    { id: "q25", text: "How long do you retain records relating to the products or services you provide us?" },
    { id: "q26", text: "Has your company been inspected by the FDA or other regulatory agency?" },
    { id: "q27", text: "Has your company been registered under FDA Establishment Registration and Listing?" },
];

export default function QuestionnaireSection({ formik }) {
    const { values, setFieldValue } = formik;

    const handleAnswerChange = (questionId, answer) => {
        setFieldValue(`questionnaire.${questionId}.answer`, answer);
    };

    return (
        <Card elevation={0} sx={{ mb: 4, borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <Box
                sx={{
                    p: 2,
                    background: "linear-gradient(135deg, #1172ba 0%, #0d5a94 100%)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <Assignment sx={{ color: "#fff" }} />
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    Organization and Documentation Questionnaire
                </Typography>
            </Box>

            <CardContent sx={{ p: 3, bgcolor: "#f8fafc" }}>
                <Typography variant="body2" sx={{ mb: 3, color: "#64748b", fontStyle: "italic" }}>
                    Please note the questions from #2 need not be answered if a relevant ISO certification is available and shared
                </Typography>

                <Grid container spacing={3}>
                    {questions.map((question, index) => (
                        <Grid size={{ xs: 6 }} key={question.id}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "white",
                                    borderRadius: 2,
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                                    {index + 1}. {question.text}
                                </Typography>

                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        value={values.questionnaire[question.id]?.answer || ""}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    >
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                        <FormControlLabel value="n/a" control={<Radio size="small" />} label="N/A" />
                                    </RadioGroup>
                                </FormControl>

                                {question.hasCertificate && values.questionnaire[question.id]?.answer === "yes" && (
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Certificate Number"
                                            value={values.questionnaire[question.id]?.certificate || ""}
                                            onChange={(e) =>
                                                setFieldValue(`questionnaire.${question.id}.certificate`, e.target.value)
                                            }
                                            sx={{ mb: 1, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={values.questionnaire[question.id]?.certCopy || false}
                                                    onChange={(e) =>
                                                        setFieldValue(`questionnaire.${question.id}.certCopy`, e.target.checked)
                                                    }
                                                />
                                            }
                                            label="Copy of certificate attached"
                                        />
                                    </Box>
                                )}

                                {question.hasDescription && (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        rows={2}
                                        label="Description"
                                        value={values.questionnaire[question.id]?.description || ""}
                                        onChange={(e) =>
                                            setFieldValue(`questionnaire.${question.id}.description`, e.target.value)
                                        }
                                        sx={{ mt: 2, "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                                    />
                                )}
                            </Box>
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Additional Comments"
                            name="additionalComments"
                            multiline
                            rows={4}
                            value={values.additionalComments}
                            onChange={formik.handleChange}
                            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
