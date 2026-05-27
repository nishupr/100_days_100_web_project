import os

# Set the name of your output file
OUTPUT_FILE = 'combined_code.txt'

# Which file types do you want to copy?
ALLOWED_EXTENSIONS = {'.html', '.css', '.js'}

# Which folders should the script ignore? (to save time and space)
IGNORE_DIRS = {'.git', '.github', 'assets', 'public', '.vercel'}

def combine_files():
    print(f"Starting to combine files into {OUTPUT_FILE}...")
    
    # Open the output file in write mode
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        # Walk through the current directory
        for root, dirs, files in os.walk('.'):
            
            # Remove ignored directories from the search so we don't go inside them
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                # Get the file extension
                ext = os.path.splitext(file)[1]
                
                # Check if it's an important file type
                if ext in ALLOWED_EXTENSIONS:
                    filepath = os.path.join(root, file)
                    
                    try:
                        # Read the content of the file
                        with open(filepath, 'r', encoding='utf-8') as infile:
                            content = infile.read()
                            
                            # Write a nice header with the filename
                            outfile.write(f"\n{'='*60}\n")
                            outfile.write(f"FILE: {filepath}\n")
                            outfile.write(f"{'='*60}\n\n")
                            
                            # Write the actual code
                            outfile.write(content)
                            outfile.write("\n")
                            
                            print(f"Copied: {filepath}")
                    except Exception as e:
                        print(f"Skipped {filepath} (Error reading file: {e})")
                        
    print(f"\nAll done! Your files have been combined into {OUTPUT_FILE}")

if __name__ == '__main__':
    combine_files()