// src/components/ReportsClient.tsx
"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/articles";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";

export default function ReportsClient() {
    const [reportedArticles, setReportedArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadReportedArticles = async () => {
        setLoading(true);
        try {
            const data = await fetchArticles();
            // Only include articles where is_reported is true
            const filtered = data.filter((article: any) => article.is_reported === true);
            setReportedArticles(filtered);
        } catch (error) {
            setError("Failed to load reported articles");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReportedArticles();
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
            Reported Articles
            </Typography>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Article ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {loading ? (
                    <TableRow>
                    <TableCell colSpan={4} align="center">
                        <CircularProgress />
                    </TableCell>
                    </TableRow>
                ) : error ? (
                    <TableRow>
                    <TableCell colSpan={4} align="center">
                        <Alert severity="error">{error}</Alert>
                    </TableCell>
                    </TableRow>
                ) : reportedArticles.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={4} align="center">
                        <Alert severity="info">No reported articles found.</Alert>
                    </TableCell>
                    </TableRow>
                ) : (
                    reportedArticles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell>{article.id}</TableCell>
                        <TableCell>{article.title}</TableCell>
                        <TableCell>{article.reported_reason}</TableCell>
                        <TableCell>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: 1 }}
                            href={`mailto:?subject=Regarding Article ID ${article.id}&body=Please review the reported article: ${article.title}`}
                        >
                            Send Email Again
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href={`/articles/${article.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    );
}
