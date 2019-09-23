%lex
%%

\s+                     /* skip whitespace */

"call"                  return "call"
"len"                   return "len"

"function"              return "function"
"return"                return "return"

"exit"                  return "exit"
"skip"                  return "skip"

"while"                 return "while"
"from"                  return "from"
"to"                    return "to"

"reserve"               return "reserve"
"allocate"              return "allocate"

"free"                  return "free"
"delete"                return "delete"

"if"                    return "if"
"else"                  return "else"

"run"                   return "run"
"print"                 return "print"

","                     return ','
"."                     return '.'

"*"                     return '*'
"/"                     return '/'

"-"                     return '-'
"+"                     return '+'

"=="                    return '=='
"is"                    return 'is'

"!="                    return '!='
"isnot"                 return 'isnot'

"="                     return '='
"not"                   return 'not'
"!"                     return '!'

"<="                    return '<='
">="                    return '>='

"<"                     return '<'
">"                     return '>'

"@"                     return '@'

"and"                   return 'and'
"or"                    return 'or'

"("                     return '('
")"                     return ')'

"["                     return '['
"]"                     return ']'

"{"                     return '{'
"}"                     return '}'

":"                     return ':'
"end"                   return 'end'

[#][^\n]*               return 'COMMENT'
"true"|"false"          return 'BOOLEAN'
"empty"                 return 'EMPTY'
[_A-Za-z][_A-Za-z0-9]*  return 'IDENTIFIER'
[-+]?[0-9]+             return 'INTEGER'
[\"][^\"]*[\"]          yytext = yytext.substr(1,yyleng-2); return 'STRING_LITERAL'
[\'][^\']*[\']          yytext = yytext.substr(1,yyleng-2); return 'STRING_LITERAL'

<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%left   ","
%right  "="
%left   "or"
%left   "and"
%left   "<" ">"
%left   "==" "is" "!=" "isnot" "<=" ">="
%left   "+" "-"
%left   "*" "/"
%right  "!" "not"
%left   "(" "{" "["
%right  "@"

%nonassoc IF_WITHOUT_ELSE
%nonassoc LIST_ASSIGNMENT
%nonassoc "else"

%start  program
%%

program
  : statement_list EOF { return $1; }
  ;

statement_list
  : statement_list statement { $$ = $1; $1.push($2); }
  | statement { $$ = [$1] }
  ;

statement
  : function_statement
  | compound_statement
  | conditional_statement
  | while_loop_statement
  | from_loop_statement
  | return_statement
  | print_statement
  | declaration_statement
  | list_assignment_statement
  | release_statement
  | expression_statement
  | exit_statement
  | skip_statement
  | assign_statement
  | no_op_statement
  | comment
  ;

function_statement
  : "function" IDENTIFIER "(" identifier_list ")" statement { $$ = { type: 'FUNCTION_DEF', name: $2, args: $4, body: $6 } }
  ;

identifier_list
  : identifier_list "," IDENTIFIER { $$ = $1; $1.push($3); }
  | IDENTIFIER { $$ = [$1] }
  | %empty
  ;

compound_statement
  : ":" statement_list "end" { $$ = $2 }
  ;

conditional_statement
  : "if" "(" expression ")" statement %prec IF_WITHOUT_ELSE { $$ = { type: 'CONDITIONAL', expression: $3, main: $5 } }
  | "if" "(" expression ")" statement "else" statement { $$ = { type: 'CONDITIONAL', expression: $3, main: $5, alt: $7 } }
  ;

while_loop_statement
  : "while" "(" expression ")" statement { $$ = { type: 'WHILE_LOOP', expression: $3, body: $5 } }
  ;

from_loop_statement
  : "from" "(" IDENTIFIER ":" expression "to" expression ")" statement { $$ = { type: 'FROM_LOOP', counter: $3, lower: $5, upper: $7, body: $9 } }
  ;

return_statement
  : "return" expression "." { $$ = { type: 'RETURN', expression: $2 } }
  ;

assignment
  : IDENTIFIER "=" expression { $$ = { type: 'ASSIGNMENT', name: $1, expression: $3 } }
  | list_assignment { $$ = $1 }
  ;

list_assignment
  : expression "[" expression "]" "=" expression { $$ = { type: 'LIST_ASSIGNMENT', list: $1, index: $3, value: $6 } }
  ;

assignment_list
  : assignment_list "," assignment { $$ = $1; $1.push($3); }
  | assignment { $$ = [$1] }
  ;

run_expression
  : "run" "(" expression ")" { $$ = { type: 'RUN', expression: $3 } }
  ;

assign_statement
  : assignment_list "." { $$ = $1 }
  ;

print_statement
  : "print" "(" expression ")" "." { $$ = { type: 'PRINT', expression: $3 } }
  ;

declaration_statement
  : "reserve" declaration_list "." { $$ = { type: 'RESERVE', variableNames: $2 } }
  | "allocate" declaration_list "." { $$ = { type: 'RESERVE', variableNames: $2 } }
  ;

declaration_list
  : declaration_list "," identifier_list { $$ = $1; $1.push($3); }
  | IDENTIFIER { $$ = [$1] }
  ;

release_statement
  : "free" IDENTIFIER "." { $$ = { type: 'FREE', name: $2 } }
  | "delete" IDENTIFIER "." { $$ = { type: 'FREE', name: $2 } }
  ;

expression_statement
  : expression "." { $$ = $1 }
  ;

exit_statement
  : "exit" "." { $$ = { type: 'EXIT' } }
  ;

skip_statement
  : "skip" "." { $$ = { type: 'SKIP' } }
  ;

no_op_statement
  : "."
  ;

comment
  : COMMENT
  ;

expression
  : INTEGER { $$ = { type: 'INTEGER', value: parseInt(yytext) } }
  | STRING_LITERAL { $$ = { type: 'STRING', value: yytext } }
  | EMPTY { $$ = { type: 'EMPTY' } }
  | IDENTIFIER { $$ = { type: 'IDENTIFIER', name: yytext } }
  | BOOLEAN { $$ = { type: 'BOOLEAN', value: Boolean(eval(yytext)) } }
  | length_expression { $$ = $1 }
  | list_definition_expression { $$ = $1 }
  | list_access_expression { $$ = $1 }
  | "(" expression ")" { $$ = $2 }
  | function_call_expression
  | binary_expression
  | unary_expression
  | run_expression
  ;

expression_list
  : expression_list "," expression { $$ = $1; $1.push($3); }
  | expression { $$ = [$1] }
  | %empty
  ;

list_definition_expression
  : "{" expression_list "}" { $$ = { type: 'LIST_DEF', body: $2 } }
  ;

list_access_expression
  : expression "[" expression "]" { $$ = { type: 'LIST_ACCESS', list: $1, index: $3 } }
  ;

unary_expression
  : "not" "(" expression ")" { $$ = { type: 'NOT', expression: $3 } }
  | "!" "(" expression ")" { $$ = { type: 'NOT', expression: $3 } }
  | "-" INTEGER %prec "!" { $$ = { type: 'INTEGER', value: -1 * parseInt($2) } }
  ;

binary_expression
  : addition_expression
  | subtraction_expression
  | multiplication_expression
  | division_expression
  | logic_and_expression
  | logic_or_expression
  | equal_to_expression
  | not_equal_to_expression
  | less_than
  | greater_than
  | less_than_or_equal_to_expression
  | greater_than_or_equal_to_expression
  ;

addition_expression
  : expression "+" expression { $$ = { type: "ADDITION", left: $1, right: $3 } }
  ;

subtraction_expression
  : expression "-" expression { $$ = { type: "SUBTRACTION", left: $1, right: $3 } }
  ;

multiplication_expression
  : expression "*" expression { $$ = { type: "MULTIPLICATION", left: $1, right: $3 } }
  ;

division_expression
  : expression "/" expression { $$ = { type: "DIVISION", left: $1, right: $3 } }
  ;

logic_and_expression
  : expression "and" expression { $$ = { type: "AND", left: $1, right: $3 } }
  ;

logic_or_expression
  : expression "or" expression { $$ = { type: "OR", left: $1, right: $3 } }
  ;

equal_to_expression
  : expression "==" expression { $$ = { type: "EQUAL_TO", left: $1, right: $3 } }
  | expression "is" expression { $$ = { type: "EQUAL_TO", left: $1, right: $3 } }
  ;

not_equal_to_expression
  : expression "!=" expression { $$ = { type: "NOT_EQUAL_TO", left: $1, right: $3 } }
  | expression "isnot" expression { $$ = { type: "NOT_EQUAL_TO", left: $1, right: $3 } }
  ;

length_expression
  : "len" "(" expression ")" { $$ = { type: "LENGTH_OF", expression: $3 } }
  ;

less_than
  : expression "<" expression { $$ = { type: "LESS_THAN", left: $1, right: $3 } }
  ;

greater_than
  : expression ">" expression { $$ = { type: "GREATER_THAN", left: $1, right: $3 } }
  ;

less_than_or_equal_to_expression
  : expression "<=" expression { $$ = { type: "LESS_THAN_EQUAL_TO", left: $1, right: $3 } }
  ;

greater_than_or_equal_to_expression
  : expression ">=" expression { $$ = { type: "GREATER_THAN_EQUAL_TO", left: $1, right: $3 } }
  ;

function_call_expression
  : "call" IDENTIFIER "(" expression_list ")" { $$ = { type: 'FUNCTION_CALL', name: $2, args: $4 } }
  ;