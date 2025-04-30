'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import {
    AttachFile as AttachFileIcon,
    Close as CloseIcon,
    Delete as DeleteIcon,
    Description as DocIcon,
    InsertDriveFile as FileIcon,
    PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

interface AttachFileProps {
    accept: string;
    maxFileSize: number;
    onFilesChange: (files: File[]) => void;
    toggleAttachments: () => void;
}

export default function AttachFile({ accept = '*/*', maxFileSize = 25 * 1024 * 1024, onFilesChange, toggleAttachments }: AttachFileProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback((newFiles: FileList | File[]) => {
        setError('');
        const fileList = Array.from(newFiles);

        // Check file sizes
        const oversizedFiles = fileList.filter(file => file.size > maxFileSize);
        if (oversizedFiles.length > 0) {
            setError(`The following files are too large: ${oversizedFiles.map(file => file.name).join(', ')}, exceed the maximum size of ${maxFileSize / (1024 * 1024)} MB.`);
            return;
        }

        const updatedFiles = [...files, ...fileList];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    }, [files, maxFileSize, onFilesChange]);

    const handleButtonClick = () => {
        fileInputRef.current?.click();    
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
          handleFileChange(event.target.files);
        }
    };

    const handleRemoveFile = (index: number) => {
        // Clean up object URL if it's an image
        if (files[index].type.startsWith('image/')) {
            URL.revokeObjectURL(URL.createObjectURL(files[index]));
        }

        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    // Drag and drop handlers
    const handleDragEnter = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
      }, []);
    
    const handleDragLeave = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        }, []);

    const handleDragOver = useCallback ((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handleDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        
        if (event.dataTransfer.files.length) {
          handleFileChange(event.dataTransfer.files);
        }
    }, [handleFileChange]);

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    };

    // Helper function to get file icon based on file type
    const getFileIcon = (file: File) => {
        const fileName = file.name.toLowerCase();

        // Check if file is an image
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg'].some(ext => fileName.endsWith(`.${ext}`));
        if (isImage) {
            return (
                <Box 
                    component='img'
                    src={URL.createObjectURL(file)}
                    sx={{ width: 40, height: 40,
                        borderRadius: 2, 
                        objectFit: 'cover',
                        display: 'block', }}
                    alt='Preview' />
            );
        }
        
        // For non-image files, use appropriate icons
        const extension = fileName.split('.').pop();
        switch(extension) {
            case 'pdf':
                return <PdfIcon color='error' />;
            case 'doc':
            case 'docx':
                return <DocIcon color='info' />;
            default:
                return <FileIcon color='action' />;
        }
    };

    // Cleanup object URLs when component unmounts or files change
    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    URL.revokeObjectURL(URL.createObjectURL(file));
                }
            });
        };
    }, [files]);

    return (
        <Paper
            elevation={3}
            sx={{ maxWidth: 1120, width: '100%', p: 3,
                borderRadius: 5,
                bgcolor: 'white',
                zIndex: 100,}}>
            <Box
                sx={{ mb: 2, 
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'space-between', }}>
                <Typography
                    variant='h5'
                    fontWeight='bold'
                    sx={{ flexGrow: 1, textAlign: 'center', }}>
                    Attach a file
                </Typography>

                <IconButton onClick={toggleAttachments} >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Paper
                variant='outlined'
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                sx={{ mb: 2, p: 3, gap: 2,
                    borderColor: 'black',
                    borderRadius: 4,
                    border: isDragging ? '2px solid #1976d2' : '1px solid rgb(0, 0, 0)',
                    // backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center', }}>
                <Button
                    variant='outlined'
                    startIcon={<AttachFileIcon />}
                    onClick={handleButtonClick}
                    sx={{ mb: 2, p: 1.5,
                        color: 'gray',
                        fontWeight: 'bold',
                        borderColor: 'black',
                        borderRadius: 3,
                        whiteSpace: 'nowrap',
                        '&:hover': { borderColor: 'black', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                    Attach a file
                </Button>

                <input type='file'
                    multiple
                    accept={accept}
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    style={{ display: 'none' }} />

                <Typography variant='body1' color='text.secondary' sx={{ mb: 2, fontStyle: 'italic', whiteSpace: 'nowrap', }}>
                    Drag & drop any images or documents that might be helpful in explaining your brief here.
                    <br />
                    (Max {maxFileSize / (1024 * 1024)} MB).
                </Typography>
            </Paper>

            {error && (
                <Typography variant='body2' color='error' sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {files.length > 0 && (
                <>
                    <List>
                        {files.map((file, index) => (
                            <React.Fragment key={file.name + file.size}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge='end'
                                            aria-label='delete'
                                            onClick={() => handleRemoveFile(index)}>
                                            <DeleteIcon />
                                        </IconButton> }
                                    sx={{ py: 1.5,
                                        '& .MuiListItemText-primary': { fontWeight: 'medium', } }} >
                                    <ListItemIcon>
                                        <Box sx={{ width: 40, height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: (theme) => theme.palette.grey[100],
                                            borderRadius: 2, }}>
                                            {getFileIcon(file)}
                                        </Box>
                                    </ListItemIcon>
                    
                                    <ListItemText
                                        primary={file.name}
                                        secondary={`${(file.size / 1024).toFixed(2)} KB. Added ${formatDate(new Date())}`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                            </React.Fragment>
                        ))}
                    </List>
                    <Typography variant='caption'>
                        {files.length} file(s) selected
                    </Typography>
                </>
            )}
          
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button 
                    variant='contained'
                    sx={{ px: 4, py: 1.5,
                        fontWeight: 'bold',
                        textTransform: 'none', }}>
                    Save
                </Button>
            </Box>
        </Paper>
    );
};