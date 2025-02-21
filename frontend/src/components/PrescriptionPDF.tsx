import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Prescription, PrescriptionMedication } from '../services/prescriptionService';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 12,
        marginBottom: 5
    },
    table: {
        display: 'flex' as const,
        width: 'auto',
        marginVertical: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold'
    },
    tableCell: {
        width: '33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    }
});

interface PrescriptionPDFProps {
    prescription: Prescription;
}

const PrescriptionPDF: React.FC<PrescriptionPDFProps> = ({ prescription }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Reçete</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Hasta Bilgileri</Text>
                <Text style={styles.text}>Hasta Adı: {prescription.patientName}</Text>
                <Text style={styles.text}>Durum: {prescription.status}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>İlaçlar</Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>İlaç</Text>
                        <Text style={styles.tableCell}>Doz</Text>
                        <Text style={styles.tableCell}>Kullanım</Text>
                    </View>
                    {prescription.medications.map((medication: PrescriptionMedication, index: number) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{medication.name}</Text>
                            <Text style={styles.tableCell}>{medication.dose}</Text>
                            <Text style={styles.tableCell}>{medication.frequency}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default PrescriptionPDF; 