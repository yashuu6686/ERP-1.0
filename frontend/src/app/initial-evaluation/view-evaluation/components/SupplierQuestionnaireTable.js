import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Typography,
    Box
} from "@mui/material";

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

const SupplierQuestionnaireTable = ({ evaluation }) => {
    const getAnswerColor = (answer) => {
        switch (answer) {
            case "yes": return { bgcolor: "#dcfce7", color: "#15803d" };
            case "no": return { bgcolor: "#fee2e2", color: "#b91c1c" };
            case "n/a": return { bgcolor: "#f1f5f9", color: "#64748b" };
            default: return { bgcolor: "#fef9c3", color: "#a16207" };
        }
    };

    return (
        <Paper elevation={0} sx={{
            border: "1px solid #e2e8f0",
            borderRadius: 3,
            overflow: "hidden",
            mb: 4
        }}>
            <Box sx={{
                p: 2,
                borderBottom: "1px solid #e2e8f0",
                bgcolor: "#f8fafc"
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#0f172a" }}>
                    Organization and Documentation Questionnaire
                </Typography>
            </Box>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                            <TableCell sx={{ fontWeight: 600, color: "#64748b", py: 2 }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#64748b", py: 2 }}>Question</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#64748b", py: 2, textAlign: "center", width: "100px" }}>Answer</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "#64748b", py: 2, width: "30%" }}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question, index) => {
                            const answer = evaluation.questionnaire?.[question.id];
                            return (
                                <TableRow key={question.id} hover>
                                    <TableCell sx={{ color: "#64748b", fontSize: "0.85rem" }}>{index + 1}</TableCell>
                                    <TableCell sx={{ color: "#334155", fontSize: "0.85rem" }}>{question.text}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        {answer?.answer ? (
                                            <Chip
                                                label={answer.answer.toUpperCase()}
                                                size="small"
                                                sx={{
                                                    ...getAnswerColor(answer.answer),
                                                    fontWeight: 700,
                                                    fontSize: "0.65rem",
                                                    height: "20px"
                                                }}
                                            />
                                        ) : (
                                            <Typography variant="caption" sx={{ color: "#94a3b8" }}>N/A</Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {question.hasCertificate && answer?.certificate && (
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                                                    Certificate: {answer.certificate}
                                                </Typography>
                                                {answer.certCopy && (
                                                    <Chip label="Copy Attached" size="small" sx={{ fontSize: "0.6rem", height: "18px", mt: 0.5 }} />
                                                )}
                                            </Box>
                                        )}
                                        {question.hasDescription && answer?.description && (
                                            <Typography variant="caption" sx={{ color: "#475569" }}>
                                                {answer.description}
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {evaluation.additionalComments && (
                <Box sx={{ p: 3, bgcolor: "#fff", borderTop: "1px solid #e2e8f0" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Additional Comments</Typography>
                    <Typography variant="body2" sx={{ color: "#475569" }}>{evaluation.additionalComments}</Typography>
                </Box>
            )}
        </Paper>
    );
};

export default SupplierQuestionnaireTable;
