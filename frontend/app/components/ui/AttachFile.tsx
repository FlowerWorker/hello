"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
    Box,
    Button,
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import {
    AttachFile as AttachFileIcon,
    CloseIcon as CloseIcon,
    Delete as DeleteIcon,
    InsertDriveFile as FileIcon,
  } from '@mui/icons-material';

import xIcon from "@/app/public/x-icon.svg";
import attachIcon from "@/app/public/attachIcon.svg";
import attachIcon2 from "@/app/public/attachIcon2.svg";

export default function AttachFile({ toggleAttachments }: { toggleAttachments: () => void }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
    
    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 1120,
                width: "100%",
                padding: 3,
                borderRadius: 6,
                bgcolor: "white",
                zIndex: 100,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: -1,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        flexGrow: 1,
                        textAlign: "center",
                    }}
                >
                    Attach a file
                </Typography>
                <IconButton>
                    <CloseIcon onClick={toggleAttachments} />
                </IconButton>
            </Box>

            <Box sx={{ position: "relative" }}>

            </Box>
        </Paper>

    )
}