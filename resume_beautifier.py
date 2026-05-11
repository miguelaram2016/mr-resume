"""
Resume Beautifier - Post-processes DOCX to make it professional
Adds:
- Section lines (horizontal borders)
- Professional fonts (Arial)
- Proper spacing
- Bold section headers
"""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def add_section_line(paragraph):
    """Add a horizontal line after a section header"""
    p = paragraph._p
    pPr = p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), '000000')
    pBdr.append(bottom)
    pPr.append(pBdr)

def beautify_resume(docx_path, output_path=None):
    """Apply professional formatting to resume DOCX"""
    doc = Document(docx_path)
    
    if output_path is None:
        output_path = docx_path
    
    # Set default font to Arial 11pt
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Arial'
    font.size = Pt(11)
    
    # Track sections to add lines after
    section_keywords = [
        'PROFESSIONAL SUMMARY', 'SUMMARY', 'OBJECTIVE',
        'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT',
        'SKILLS', 'CORE SKILLS', 'TECHNICAL SKILLS',
        'EDUCATION', 'CERTIFICATIONS', 'PROJECTS',
        'ADDITIONAL INFORMATION', 'OTHER'
    ]
    
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip().upper()
        
        # Check if this is a section header
        is_section = any(keyword in text for keyword in section_keywords)
        
        if is_section and paragraph.style.name.startswith('Heading'):
            # Make section headers bold and slightly larger
            for run in paragraph.runs:
                run.font.bold = True
                run.font.size = Pt(12)
                run.font.name = 'Arial'
            
            # Add line after section
            add_section_line(paragraph)
        
        # Clean up any weird formatting in runs
        for run in paragraph.runs:
            run.font.name = 'Arial'
            # Keep it black
            run.font.color.rgb = RGBColor(0, 0, 0)
    
    # Save
    doc.save(output_path)
    print(f"Beautified resume saved to: {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python resume_beautifier.py <input.docx> [output.docx]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file
    
    beautify_resume(input_file, output_file)
