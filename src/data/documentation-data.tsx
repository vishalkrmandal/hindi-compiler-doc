import type { DocumentationSection } from "@/src/types/documentation"

export const documentationData: DocumentationSection[] = [
  {
    id: "project-overview",
    title: "Project Overview",
    content: [
      {
        type: "paragraph",
        text: "HindiC is a programming language with Hindi syntax based on the C programming language. It is designed for Hindi speakers who are more comfortable with their native language. The compiler translates Hindi-syntax code into standard C code, which can then be compiled with a conventional C compiler.",
      },
      {
        type: "paragraph",
        text: "The HindiC compiler follows the traditional compilation pipeline:",
      },
      {
        type: "list",
        items: [
          "Lexical analysis - Tokenizing the source code",
          "Syntax analysis - Parsing the tokens into an Abstract Syntax Tree (AST)",
          "Semantic analysis - Type checking and building a symbol table",
          "Code generation - Translating the AST to equivalent C code",
        ],
      },
    ],
  },
  {
    id: "file-structure",
    title: "File Structure",
    content: [
      {
        type: "code",
        language: "plaintext",
        code: `HindiC/
├── src/                   # Source code for the compiler
│   ├── lexer/             # Lexical analyzer
│   │   └── lexer.c        # Implements the lexical analyzer
│   ├── parser/            # Syntax analyzer
│   │   └── parser.c       # Implements the parser
│   ├── ast/               # Abstract Syntax Tree
│   │   └── ast.c          # Implements AST creation and manipulation
│   ├── semantic/          # Semantic analyzer
│   │   ├── semantic.c     # Implements type checking
│   │   └── symbol_table.c # Implements symbol table operations
│   ├── codegen/           # Code generator
│   │   └── codegen.c      # Implements code generation to C
│   └── main.c             # Entry point of the compiler
├── include/               # Header files
│   ├── lexer.h            # Lexer definitions
│   ├── parser.h           # Parser definitions
│   ├── ast.h              # AST definitions
│   ├── semantic.h         # Semantic analyzer definitions
│   └── codegen.h          # Code generator definitions
├── examples/              # Example HindiC programs
│   ├── hello.hc           # Hello World example
│   └── calculator.hc      # Simple calculator example
├── bin/                   # Compiled binaries
│   └── hindic.exe         # The compiler executable
├── obj/                   # Object files
├── tests/                 # Test cases
├── Makefile               # Build configuration
├── README.md              # Project overview
└── documentation.md       # Detailed documentation`,
      },
    ],
  },
  {
    id: "lexical-analyzer",
    title: "Lexical Analyzer (Lexer)",
    content: [
      {
        type: "paragraph",
        text: "The lexical analyzer (lexer) is responsible for tokenizing the source code. It reads the input character by character and groups them into tokens such as keywords, identifiers, operators, and literals.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Token Definition",
      },
      {
        type: "paragraph",
        text: "Defines various token types including Hindi keywords, operators, and identifiers.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/lexer.h",
        code: `typedef enum {
    TOKEN_EOF = 0,
    
    // Data types
    TOKEN_INT,       // पूर्णांक
    TOKEN_FLOAT,     // दशमलव
    TOKEN_CHAR,      // वर्ण
    TOKEN_VOID,      // शून्य
    
    // Control flow
    TOKEN_IF,        // अगर
    TOKEN_ELSE,      // वरना
    /* More token types... */
} TokenType;`,
      },
      {
        type: "subheading",
        text: "2. Hindi Character Support",
      },
      {
        type: "paragraph",
        text: "Implements functions to detect and handle UTF-8 encoded Hindi characters.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/lexer/lexer.c",
        code: `static bool isHindiChar(const char* str) {
    // Check if we have a valid UTF-8 3-byte sequence for Hindi
    // Hindi Unicode range is approximately 0x0900 to 0x097F
    if ((unsigned char)str[0] == 0xE0 &&
        ((unsigned char)str[1] == 0xA4 || (unsigned char)str[1] == 0xA5)) {
        return true;
    }
    return false;
}`,
      },
      {
        type: "subheading",
        text: "3. Keyword Mapping",
      },
      {
        type: "paragraph",
        text: "Maps Hindi keywords to their corresponding token types.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/lexer/lexer.c",
        code: `static const KeywordMap hindiKeywords[] = {
    {"पूर्णांक", TOKEN_INT},
    {"दशमलव", TOKEN_FLOAT},
    {"वर्ण", TOKEN_CHAR},
    {"शून्य", TOKEN_VOID},
    {"अगर", TOKEN_IF},
    /* More keywords... */
    {NULL, 0} // End sentinel
};`,
      },
      {
        type: "subheading",
        text: "4. Token Recognition",
      },
      {
        type: "paragraph",
        text: "Recognizes and categorizes tokens from the input stream.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/lexer/lexer.c",
        code: `Token scanToken(Lexer* lexer) {
    skipWhitespace(lexer);
    
    lexer->start = lexer->current;
    
    if (isAtEnd(lexer)) return makeToken(lexer, TOKEN_EOF);
    
    char c = advance(lexer);
    
    // Identifiers
    if (isIdentifierStart(c)) return identifier(lexer);
    
    // Numbers
    if (isDigit(c)) return number(lexer);
    
    // Other tokens like operators and punctuation
    switch (c) {
        // Implementation details...
    }
    
    return errorToken(lexer, "Unexpected character.");
}`,
      },
    ],
  },
  {
    id: "parser",
    title: "Parser",
    content: [
      {
        type: "paragraph",
        text: "The parser takes the tokens produced by the lexer and builds an Abstract Syntax Tree (AST). It implements a recursive descent parser for the grammar of the HindiC language.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Parser Context",
      },
      {
        type: "paragraph",
        text: "Maintains the state of the parser including current and previous tokens.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/parser.h",
        code: `typedef struct {
    Lexer* lexer;
    Token current;
    Token previous;
    bool hadError;
    bool panicMode;
} Parser;`,
      },
      {
        type: "subheading",
        text: "2. Recursive Descent Functions",
      },
      {
        type: "paragraph",
        text: "Implements parsing functions for different syntax constructs.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/parser/parser.c",
        code: `static AstNode* declaration(Parser* parser) {
    // Handles variable and function declarations
    if (match(parser, TOKEN_INT) || match(parser, TOKEN_FLOAT) || 
        match(parser, TOKEN_CHAR) || match(parser, TOKEN_VOID)) {
        TokenType type = parser->previous.type;
        
        // Function or variable
        if (check(parser, TOKEN_IDENTIFIER) && 
            lookahead(parser, TOKEN_LPAREN)) {
            return (AstNode*)functionDeclaration(parser, type);
        } else {
            return varDeclaration(parser, type);
        }
    }
    
    return statement(parser);
}`,
      },
      {
        type: "subheading",
        text: "3. Error Handling",
      },
      {
        type: "paragraph",
        text: "Implements error reporting and recovery mechanisms.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/parser/parser.c",
        code: `static void synchronize(Parser* parser) {
    parser->panicMode = false;
    
    while (parser->current.type != TOKEN_EOF) {
        if (parser->previous.type == TOKEN_SEMICOLON) return;
        
        switch (parser->current.type) {
            // Sync points for recovery
            case TOKEN_INT:
            case TOKEN_FLOAT:
            /* More token types... */
                return;
            default:
                ; // Do nothing
        }
        
        advance(parser);
    }
}`,
      },
    ],
  },
  {
    id: "abstract-syntax-tree",
    title: "Abstract Syntax Tree (AST)",
    content: [
      {
        type: "paragraph",
        text: "The Abstract Syntax Tree (AST) represents the hierarchical structure of the parsed program. It consists of various node types for different language constructs.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Node Types",
      },
      {
        type: "paragraph",
        text: "Defines different types of AST nodes.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/ast.h",
        code: `typedef enum {
    // Statements
    AST_PROGRAM,          // Root node
    AST_FUNCTION_DECL,    // Function declaration
    AST_VAR_DECL,         // Variable declaration
    AST_BLOCK,            // Block of statements
    /* More node types... */
} AstNodeType;`,
      },
      {
        type: "subheading",
        text: "2. Node Structures",
      },
      {
        type: "paragraph",
        text: "Defines the structure for each type of AST node.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/ast.h",
        code: `// Base node structure
struct AstNode {
    AstNodeType type;
    int line;
    int column;
};

// Program (the root of the AST)
typedef struct {
    AstNode base;
    int count;
    int capacity;
    AstNode** declarations;
} AstProgram;

// Function declaration
typedef struct {
    AstNode base;
    Token name;
    TokenType returnType;
    int paramCount;
    struct {
        Token name;
        TokenType type;
    }* params;
    AstNode* body;
} AstFunctionDecl;

/* More node structures... */`,
      },
      {
        type: "subheading",
        text: "3. Node Creation",
      },
      {
        type: "paragraph",
        text: "Implements functions to create different types of AST nodes.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/ast/ast.c",
        code: `AstProgram* createProgram() {
    AstProgram* node = (AstProgram*)malloc(sizeof(AstProgram));
    initNode((AstNode*)node, AST_PROGRAM, 0, 0);
    node->count = 0;
    node->capacity = 8; // Initial capacity
    node->declarations = (AstNode**)malloc(sizeof(AstNode*) * node->capacity);
    return node;
}

/* More creation functions... */`,
      },
      {
        type: "subheading",
        text: "4. Node Manipulation",
      },
      {
        type: "paragraph",
        text: "Implements functions to manipulate the AST.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/ast/ast.c",
        code: `void freeAst(AstNode* node) {
    if (node == NULL) return;
    
    switch (node->type) {
        case AST_PROGRAM: {
            AstProgram* program = (AstProgram*)node;
            for (int i = 0; i < program->count; i++) {
                freeAst(program->declarations[i]);
            }
            free(program->declarations);
            break;
        }
        /* More cases... */
    }
    
    free(node);
}`,
      },
    ],
  },
  {
    id: "semantic-analyzer",
    title: "Semantic Analyzer",
    content: [
      {
        type: "paragraph",
        text: "The semantic analyzer performs type checking and builds a symbol table to track variables and functions.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Symbol Table",
      },
      {
        type: "paragraph",
        text: "Implements a symbol table to track variables and functions.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/semantic.h",
        code: `// Symbol types
typedef enum {
    SYMBOL_VARIABLE,
    SYMBOL_FUNCTION
} SymbolType;

// Symbol structure for the symbol table
typedef struct Symbol {
    char* name;
    SymbolType type;
    TokenType dataType;  // For variables and function return types
    int paramCount;      // For functions
    TokenType* paramTypes; // For functions
    int scopeDepth;
    struct Symbol* next;
} Symbol;

// Symbol table structure
typedef struct {
    Symbol* first;
    int scopeDepth;
} SymbolTable;`,
      },
      {
        type: "subheading",
        text: "2. Type Checking",
      },
      {
        type: "paragraph",
        text: "Implements type checking for expressions and statements.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/semantic/semantic.c",
        code: `static TokenType analyzeExpression(SemanticContext* context, SymbolTable* table, AstNode* node) {
    if (node == NULL) return TOKEN_ERROR;
    
    switch (node->type) {
        case AST_BINARY:
            return analyzeBinary(context, table, (AstBinary*)node);
        case AST_UNARY:
            return analyzeUnary(context, table, (AstUnary*)node);
        /* More cases... */
        default:
            semanticError(context, node->line, node->column, "Unknown expression type.");
            return TOKEN_ERROR;
    }
}`,
      },
      {
        type: "subheading",
        text: "3. Symbol Resolution",
      },
      {
        type: "paragraph",
        text: "Implements looking up symbols in the symbol table.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/semantic/symbol_table.c",
        code: `Symbol* resolveSymbol(SymbolTable* table, const char* name) {
    Symbol* current = table->first;
    
    while (current != NULL) {
        if (strcmp(current->name, name) == 0) {
            return current;
        }
        current = current->next;
    }
    
    return NULL; // Not found
}`,
      },
      {
        type: "subheading",
        text: "4. Scope Management",
      },
      {
        type: "paragraph",
        text: "Implements scope management for variable visibility.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/semantic/symbol_table.c",
        code: `void beginScope(SymbolTable* table) {
    table->scopeDepth++;
}

void endScope(SymbolTable* table) {
    // Remove symbols from the current scope
    Symbol* current = table->first;
    Symbol* previous = NULL;
    
    while (current != NULL) {
        if (current->scopeDepth == table->scopeDepth) {
            // Remove this symbol
            /* Implementation details... */
        } else {
            // Keep this symbol
            previous = current;
            current = current->next;
        }
    }
    
    table->scopeDepth--;
}`,
      },
    ],
  },
  {
    id: "code-generator",
    title: "Code Generator",
    content: [
      {
        type: "paragraph",
        text: "The code generator translates the AST into equivalent C code.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Code Generation Context",
      },
      {
        type: "paragraph",
        text: "Maintains the state of the code generator.",
      },
      {
        type: "code",
        language: "c",
        fileName: "include/codegen.h",
        code: `typedef struct {
    FILE* output;      // Output file for generated code
    int indentLevel;   // Current indentation level
} CodeGenContext;`,
      },
      {
        type: "subheading",
        text: "2. Node Translation",
      },
      {
        type: "paragraph",
        text: "Implements functions to translate different types of AST nodes to C code.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/codegen/codegen.c",
        code: `static void generateFunctionDecl(CodeGenContext* context, AstFunctionDecl* node) {
    // Function header
    fprintf(context->output, "%s %.*s(",
           getTypeString(node->returnType),
           node->name.length, node->name.start);
    
    // Parameters
    for (int i = 0; i < node->paramCount; i++) {
        if (i > 0) {
            fprintf(context->output, ", ");
        }
        
        fprintf(context->output, "%s %.*s",
               getTypeString(node->params[i].type),
               node->params[i].name.length, node->params[i].name.start);
    }
    
    fprintf(context->output, ") ");
    
    // Function body
    generateBlock(context, (AstBlock*)node->body);
}`,
      },
      {
        type: "subheading",
        text: "3. Statement Translation",
      },
      {
        type: "paragraph",
        text: "Implements translation of various statement types.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/codegen/codegen.c",
        code: `static void generateIfStatement(CodeGenContext* context, AstIf* node) {
    emitIndentation(context);
    fprintf(context->output, "if (");
    generateExpression(context, node->condition);
    fprintf(context->output, ") ");
    
    generateStatement(context, node->thenBranch);
    
    if (node->elseBranch != NULL) {
        emitIndentation(context);
        fprintf(context->output, "else ");
        generateStatement(context, node->elseBranch);
    }
}`,
      },
      {
        type: "subheading",
        text: "4. Expression Translation",
      },
      {
        type: "paragraph",
        text: "Implements translation of expressions.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/codegen/codegen.c",
        code: `static void generateBinary(CodeGenContext* context, AstBinary* node) {
    fprintf(context->output, "(");
    generateExpression(context, node->left);
    
    // Output the operator
    switch (node->operator) {
        case TOKEN_PLUS:
            fprintf(context->output, " + ");
            break;
        /* More operators... */
        default:
            fprintf(stderr, "Unknown binary operator in code generation.\\n");
            break;
    }
    
    generateExpression(context, node->right);
    fprintf(context->output, ")");
}`,
      },
    ],
  },
  {
    id: "main-program",
    title: "Main Program",
    content: [
      {
        type: "paragraph",
        text: "The main program ties all the compiler components together and handles command-line arguments.",
      },
      {
        type: "subheading",
        text: "Key Features",
      },
      {
        type: "subheading",
        text: "1. Command-Line Parsing",
      },
      {
        type: "paragraph",
        text: "Processes command-line arguments to determine compiler behavior.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/main.c",
        code: `int main(int argc, char* argv[]) {
    // Check command-line arguments
    if (argc < 2) {
        printUsage(argv[0]);
        return 1;
    }
    
    // Parse command-line options
    char* inputPath = NULL;
    char* outputPath = NULL;
    bool tokenizeOnly = false;
    bool parseOnly = false;
    
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-o") == 0) {
            if (i + 1 < argc) {
                outputPath = argv[++i];
            } else {
                fprintf(stderr, "Error: -o option requires an argument.\\n");
                return 1;
            }
        } else if (strcmp(argv[i], "-t") == 0) {
            tokenizeOnly = true;
        } else if (strcmp(argv[i], "-p") == 0) {
            parseOnly = true;
        } else if (strcmp(argv[i], "-h") == 0) {
            printUsage(argv[0]);
            return 0;
        } else if (inputPath == NULL) {
            inputPath = argv[i];
        } else {
            fprintf(stderr, "Error: Unexpected argument '%s'.\\n", argv[i]);
            return 1;
        }
    }
    
    /* More implementation... */
}`,
      },
      {
        type: "subheading",
        text: "2. Compilation Pipeline",
      },
      {
        type: "paragraph",
        text: "Orchestrates the compilation process from lexical analysis to code generation.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/main.c",
        code: `int main(int argc, char* argv[]) {
    /* Command-line parsing... */
    
    // Read the input file
    char* source = readFile(inputPath);
    if (source == NULL) {
        return 1;
    }
    
    // Initialize the lexer
    Lexer lexer;
    initLexer(&lexer, source);
    
    // Tokenize mode
    if (tokenizeOnly) {
        /* Tokenize and print tokens */
        return 0;
    }
    
    // Initialize the parser
    Parser parser;
    initParser(&parser, &lexer);
    
    // Parse the source code
    AstProgram* program = parse(&parser);
    
    if (parser.hadError) {
        /* Handle parsing error */
        return 1;
    }
    
    if (parseOnly) {
        /* Handle parse-only mode */
        return 0;
    }
    
    // Semantic analysis
    SymbolTable symbolTable;
    SemanticContext semanticContext;
    initSemanticAnalyzer(&semanticContext, &symbolTable);
    
    bool semanticSuccess = analyzeProgram(&semanticContext, &symbolTable, program);
    
    if (!semanticSuccess) {
        /* Handle semantic error */
        return 1;
    }
    
    // Code generation
    FILE* outputFile = fopen(outputPath, "w");
    if (outputFile == NULL) {
        /* Handle output file error */
        return 1;
    }
    
    CodeGenContext codeGenContext;
    initCodeGen(&codeGenContext, outputFile);
    
    generateCode(&codeGenContext, program);
    
    /* Cleanup... */
    
    return 0;
}`,
      },
      {
        type: "subheading",
        text: "3. File Handling",
      },
      {
        type: "paragraph",
        text: "Manages reading source files and writing output files.",
      },
      {
        type: "code",
        language: "c",
        fileName: "src/main.c",
        code: `static char* readFile(const char* path) {
    FILE* file = fopen(path, "rb");
    if (file == NULL) {
        fprintf(stderr, "Error: Could not open file '%s'.\\n", path);
        return NULL;
    }
    
    // Get file size
    fseek(file, 0L, SEEK_END);
    size_t fileSize = ftell(file);
    rewind(file);
    
    // Allocate buffer
    char* buffer = (char*)malloc(fileSize + 1);
    if (buffer == NULL) {
        fprintf(stderr, "Error: Not enough memory to read file '%s'.\\n", path);
        fclose(file);
        return NULL;
    }
    
    // Read file
    size_t bytesRead = fread(buffer, sizeof(char), fileSize, file);
    if (bytesRead < fileSize) {
        fprintf(stderr, "Error: Could not read file '%s'.\\n", path);
        free(buffer);
        fclose(file);
        return NULL;
    }
    
    // Null-terminate the string
    buffer[bytesRead] = '\\0';
    
    fclose(file);
    return buffer;
}`,
      },
    ],
  },
  {
    id: "building-and-running",
    title: "Building and Running",
    content: [
      {
        type: "paragraph",
        text: "The HindiC compiler can be built from source using the provided Makefile or by manually compiling each component.",
      },
      {
        type: "subheading",
        text: "Using Make",
      },
      {
        type: "code",
        language: "bash",
        code: `# Build the compiler
make

# Clean build artifacts
make clean

# Test with an example
make test`,
      },
      {
        type: "subheading",
        text: "Manual Compilation on Windows",
      },
      {
        type: "code",
        language: "powershell",
        code: `# Create directories if they don't exist
mkdir -Force obj
mkdir -Force bin

# Compile each component
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/lexer.o src/lexer/lexer.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/parser.o src/parser/parser.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/ast.o src/ast/ast.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/semantic.o src/semantic/semantic.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/symbol_table.o src/semantic/symbol_table.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/codegen.o src/codegen/codegen.c
gcc -Wall -Wextra -std=c99 -g -Iinclude -c -o obj/main.o src/main.c

# Link everything together
gcc -Wall -Wextra -std=c99 -g -o bin/hindic.exe obj/lexer.o obj/parser.o obj/ast.o obj/semantic.o obj/symbol_table.o obj/codegen.o obj/main.o`,
      },
      {
        type: "subheading",
        text: "Running the Compiler",
      },
      {
        type: "code",
        language: "bash",
        code: `# Basic usage
./bin/hindic examples/hello.hc -o hello.c

# Tokenize only mode
./bin/hindic examples/hello.hc -t

# Parse only mode
./bin/hindic examples/hello.hc -p

# Compile the generated C code
gcc hello.c -o hello`,
      },
    ],
  },
  {
    id: "example-programs",
    title: "Example Programs",
    content: [
      {
        type: "subheading",
        text: "Hello World (examples/hello.hc)",
      },
      {
        type: "code",
        language: "c",
        code: `// Hello World program in Hindi-C

शून्य मुख्य() {
    लिखो("नमस्ते दुनिया!");
    वापस 0;
}`,
      },
      {
        type: "paragraph",
        text: "Generated C code:",
      },
      {
        type: "code",
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

void main() {
    printf("नमस्ते दुनिया!");
    return 0;
}`,
      },
      {
        type: "subheading",
        text: "Simple Calculator (examples/calculator.hc)",
      },
      {
        type: "code",
        language: "c",
        code: `// Simple calculator program in Hindi-C

पूर्णांक जोड़(पूर्णांक क, पूर्णांक ख) {
    वापस क + ख;
}

पूर्णांक घटाव(पूर्णांक क, पूर्णांक ख) {
    वापस क - ख;
}

पूर्णांक गुणा(पूर्णांक क, पूर्णांक ख) {
    वापस क * ख;
}

दशमलव भाग(पूर्णांक क, पूर्णांक ख) {
    अगर (ख == 0) {
        लिखो("त्रुटि: शून्य से भाग नहीं कर सकते!");
        वापस 0.0;
    }
    वापस क / ख;
}

पूर्णांक मुख्य() {
    पूर्णांक पहला_संख्या = 10;
    पूर्णांक दूसरा_संख्या = 5;
    
    लिखो("%d + %d = %d\\n", पहला_संख्या, दूसरा_संख्या, जोड़(पहला_संख्या, दूसरा_संख्या));
    लिखो("%d - %d = %d\\n", पहला_संख्या, दूसरा_संख्या, घटाव(पहला_संख्या, दूसरा_संख्या));
    लिखो("%d * %d = %d\\n", पहला_संख्या, दूसरा_संख्या, गुणा(पहला_संख्या, दूसरा_संख्या));
    लिखो("%d / %d = %f\\n", पहला_संख्या, दूसरा_संख्या, भाग(पहला_संख्या, दूसरा_संख्या));
    
    वापस 0;
}`,
      },
      {
        type: "paragraph",
        text: "Generated C code:",
      },
      {
        type: "code",
        language: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}

int multiply(int a, int b) {
    return a * b;
}

float divide(int a, int b) {
    if (b == 0) {
        printf("Error: Cannot divide by zero!");
        return 0.0;
    }
    return a / (float)b;
}

int main() {
    int first_number = 10;
    int second_number = 5;
    
    printf("%d + %d = %d\\n", first_number, second_number, add(first_number, second_number));
    printf("%d - %d = %d\\n", first_number, second_number, subtract(first_number, second_number));
    printf("%d * %d = %d\\n", first_number, second_number, multiply(first_number, second_number));
    printf("%d / %d = %f\\n", first_number, second_number, divide(first_number, second_number));
    
    return 0;
}`,
      },
    ],
  },
  {
    id: "implementation-challenges",
    title: "Implementation Challenges",
    content: [
      {
        type: "subheading",
        text: "1. UTF-8 Handling in C",
      },
      {
        type: "paragraph",
        text: "One of the major challenges was dealing with UTF-8 encoded Hindi characters in C, which doesn't natively support Unicode identifiers. Each Hindi character is encoded as a 3-byte sequence in UTF-8, requiring special handling in the lexer.",
      },
      {
        type: "code",
        language: "c",
        code: `// Example of how UTF-8 Hindi characters are represented
// "श" is encoded as 0xE0 0xA4 0xB6 (3 bytes)`,
      },
      {
        type: "subheading",
        text: "2. C Compiler Limitations",
      },
      {
        type: "paragraph",
        text: "Standard C compilers like GCC do not support Hindi identifiers, so the code generator needs to map Hindi identifiers to valid C identifiers.",
      },
      {
        type: "subheading",
        text: "3. Symbol Table with Unicode Support",
      },
      {
        type: "paragraph",
        text: "The symbol table needs to handle Hindi identifiers, which requires proper Unicode comparison and hashing functions.",
      },
      {
        type: "subheading",
        text: "4. Testing with Hindi Input",
      },
      {
        type: "paragraph",
        text: "Testing the compiler with Hindi input requires proper UTF-8 encoding of test files and console output, which can be challenging in environments with limited Unicode support.",
      },
    ],
  },
  {
    id: "future-improvements",
    title: "Future Improvements",
    content: [
      {
        type: "subheading",
        text: "1. Enhanced Unicode Support",
      },
      {
        type: "paragraph",
        text: "Improve Unicode handling throughout the compiler, particularly in the lexer's identifier recognition logic.",
      },
      {
        type: "subheading",
        text: "2. Direct Code Generation",
      },
      {
        type: "paragraph",
        text: "Instead of generating C code, directly generate machine code or LLVM IR to bypass C's Unicode limitations.",
      },
      {
        type: "subheading",
        text: "3. Expanded Standard Library",
      },
      {
        type: "paragraph",
        text: "Create a more comprehensive standard library with Hindi function names for common operations.",
      },
      {
        type: "subheading",
        text: "4. Improved Error Messages",
      },
      {
        type: "paragraph",
        text: "Provide more detailed error messages in Hindi to help users debug their code.",
      },
      {
        type: "subheading",
        text: "5. IDE Integration",
      },
      {
        type: "paragraph",
        text: "Develop plugins for popular IDEs to provide syntax highlighting, code completion, and debugging support for HindiC.",
      },
    ],
  },
]

