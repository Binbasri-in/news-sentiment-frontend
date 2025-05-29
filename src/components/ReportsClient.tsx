"use client";

import { useState, useEffect } from "react";
import { fetchArticles } from "@/lib/articles";
import { sendMinistryEmail, sendSourceEmail } from "@/lib/emails";
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
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.reported_reason}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ mr: 1 }}
                                            onClick={async () => {
                                                try {
                                                    await sendSourceEmail({
                                                        source_email: article.ministry_to_report,
                                                        article_title: article.title,
                                                        article_url: article.url,
                                                    });
                                                    alert("Email has been sent to the source.");
                                                } catch (err) {
                                                    alert("Failed to send email to source.");
                                                }
                                            }}
                                        >
                                            Send Email to Source
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            sx={{ mr: 1 }}
                                            onClick={async () => {
                                                try {
                                                    await sendMinistryEmail({
                                                        ministry: article.ministry_to_report,
                                                        article_title: article.title,
                                                        article_url: article.url,
                                                    });
                                                    alert("Email has been sent to the ministry.");
                                                } catch (err) {
                                                    alert("Failed to send email to ministry.");
                                                }
                                            }}
                                        >
                                            Send Email to Ministry
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
