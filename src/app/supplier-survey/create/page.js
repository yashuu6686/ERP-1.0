"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import SupplierSurveyForm from "../components/SupplierSurveyForm";
import Loader from "../../../components/ui/Loader";
import axiosInstance from "../../../axios/axiosInstance";

function SurveyFormContainer() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [initialData, setInitialData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchSurveyData = async () => {
                setLoading(true);
                try {
                    const response = await axiosInstance.get(`/supplier-surveys/${id}`);
                    setInitialData(response.data);
                } catch (error) {
                    console.error("Error fetching survey data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchSurveyData();
        }
    }, [id]);

    if (loading) {
        return <Loader message="Fetching survey data..." />;
    }

    return <SupplierSurveyForm initialData={initialData} isEdit={!!id} />;
}

export default function CreateOrEditSupplierSurveyPage() {
    return (
        <Suspense fallback={<Loader message="Loading..." />}>
            <Box>
                <SurveyFormContainer />
            </Box>
        </Suspense>
    );
}
