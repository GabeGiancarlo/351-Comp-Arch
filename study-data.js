// Computer Architecture 351 - Comprehensive Study Data
// Ultra-detailed technical analysis with precise examples

const studyData = {
  lectures: [
    {
      id: "assembly_language",
      title: "Assembly Language Programming - Complete Deep Dive",
      slides: [
        {
          title: "MIPS Instruction Formats - Technical Deep Dive",
          content: {
            concepts: [
              {
                term: "R-format (Register Format) - Complete Technical Analysis",
                layDefinition: "The 'recipe card' for instructions that work with two numbers already in the CPU's fast storage (registers) and put the result in another fast storage slot.",
                technicalDefinition: "32-bit instruction format: 6-bit opcode (always 000000), 5-bit rs (source register 1), 5-bit rt (source register 2), 5-bit rd (destination register), 5-bit shamt (shift amount), 6-bit funct (function code). Used exclusively for register-to-register operations.",
                preciseExample: "add $t0, $t1, $t2",
                binaryBreakdown: "000000 01001 01010 01000 00000 100000",
                fieldAnalysis: {
                  opcode: "000000 (always 0 for R-type)",
                  rs: "01001 = $t1 (register 9)",
                  rt: "01010 = $t2 (register 10)", 
                  rd: "01000 = $t0 (register 8)",
                  shamt: "00000 (no shift)",
                  funct: "100000 = 32 decimal = add operation"
                },
                keyPoints: [
                  "6-bit opcode always 000000 (identifies as R-type)",
                  "rs field: 5 bits = 32 possible source registers (0-31)",
                  "rt field: 5 bits = 32 possible source registers (0-31)",
                  "rd field: 5 bits = 32 possible destination registers (0-31)",
                  "shamt: 5 bits = shift amount (0-31 positions)",
                  "funct: 6 bits = 64 possible function codes (0-63)"
                ],
                registerMapping: {
                  "$zero": "00000 (register 0) - always contains 0",
                  "$at": "00001 (register 1) - assembler temporary",
                  "$v0-$v1": "00010-00011 (registers 2-3) - return values",
                  "$a0-$a3": "00100-00111 (registers 4-7) - arguments",
                  "$t0-$t7": "01000-01111 (registers 8-15) - temporaries",
                  "$s0-$s7": "10000-10111 (registers 16-23) - saved",
                  "$t8-$t9": "11000-11001 (registers 24-25) - more temporaries",
                  "$k0-$k1": "11010-11011 (registers 26-27) - kernel",
                  "$gp": "11100 (register 28) - global pointer",
                  "$sp": "11101 (register 29) - stack pointer",
                  "$fp": "11110 (register 30) - frame pointer",
                  "$ra": "11111 (register 31) - return address"
                }
              },
              {
                term: "I-format (Immediate Format) - Complete Technical Analysis",
                layDefinition: "The 'recipe card' for instructions that work with one number from fast storage and one constant number, or for loading/storing data from/to memory.",
                technicalDefinition: "32-bit instruction format: 6-bit opcode (varies by instruction), 5-bit rs (source register), 5-bit rt (destination register), 16-bit immediate (constant value). Used for arithmetic with constants, memory operations, and conditional branches.",
                preciseExample: "addi $t0, $t1, 100",
                binaryBreakdown: "001000 01001 01000 0000000001100100",
                fieldAnalysis: {
                  opcode: "001000 = 8 decimal = addi operation",
                  rs: "01001 = $t1 (register 9) - source",
                  rt: "01000 = $t0 (register 8) - destination", 
                  immediate: "0000000001100100 = 100 decimal"
                },
                signExtension: {
                  process: "16-bit immediate sign-extended to 32 bits",
                  example: "100 = 0000000001100100 (positive)",
                  negativeExample: "-100 = 1111111110011100 (negative)",
                  range: "Immediate values: -32,768 to +32,767"
                },
                keyPoints: [
                  "6-bit opcode varies by instruction type",
                  "rs field: 5 bits = source register (0-31)",
                  "rt field: 5 bits = destination register (0-31)",
                  "immediate: 16 bits = constant value (-32,768 to +32,767)",
                  "Sign extension: bit 15 determines if value is positive or negative"
                ],
                instructionTypes: {
                  arithmetic: ["addi", "addiu", "slti", "sltiu"],
                  memory: ["lw", "sw", "lh", "sh", "lb", "sb", "lbu"],
                  branches: ["beq", "bne", "blez", "bgtz", "bltz", "bgez"]
                }
              },
              {
                term: "J-format (Jump Format) - Complete Technical Analysis",
                layDefinition: "The 'recipe card' for instructions that make the program jump to a completely different location in memory, like skipping to a different page in a book.",
                technicalDefinition: "32-bit instruction format: 6-bit opcode (000010 for j, 000011 for jal), 26-bit address (jump target). Used for unconditional jumps and function calls.",
                preciseExample: "j loop_start",
                binaryBreakdown: "000010 followed by 26-bit address",
                fieldAnalysis: {
                  opcode: "000010 = 2 decimal = j operation",
                  address: "26 bits = jump target address"
                },
                addressCalculation: {
                  process: "26-bit address shifted left 2 bits, then combined with upper 4 bits of PC+4",
                  formula: "Jump Address = (PC+4)[31:28] || (address << 2)",
                  example: "If PC+4 = 0x00400020 and address = 0x0000000A, then jump address = 0x00400028"
                },
                keyPoints: [
                  "6-bit opcode: 000010 (j) or 000011 (jal)",
                  "26-bit address field (shifted left 2 bits)",
                  "Combined with upper 4 bits of PC+4",
                  "Jump range: ±128MB from current location"
                ],
                jumpTypes: {
                  j: "Unconditional jump - just changes PC",
                  jal: "Jump and link - saves PC+4 to $ra, then jumps"
                }
              }
            ]
          }
        },
        {
          title: "MIPS Instruction Types - Complete Technical Reference",
          content: {
            concepts: [
              {
                term: "Arithmetic Instructions - Complete Technical Analysis",
                layDefinition: "The basic math operations the CPU can perform - addition, subtraction, multiplication, and division - all working with numbers stored in the CPU's fast memory slots.",
                technicalDefinition: "R-format instructions that perform mathematical operations on 32-bit register values. All operations use 3 registers: 2 source operands and 1 destination. Results are stored in the destination register with overflow detection.",
                preciseExamples: {
                  addition: {
                    instruction: "add $t0, $t1, $t2",
                    meaning: "$t0 = $t1 + $t2",
                    binary: "000000 01001 01010 01000 00000 100000",
                    funct: "100000 = 32 decimal = add operation",
                    overflow: "Overflow occurs if result > 2^31-1 or < -2^31"
                  },
                  subtraction: {
                    instruction: "sub $s0, $s1, $s2", 
                    meaning: "$s0 = $s1 - $s2",
                    binary: "000000 10001 10010 10000 00000 100010",
                    funct: "100010 = 34 decimal = subtract operation",
                    overflow: "Overflow occurs if result > 2^31-1 or < -2^31"
                  },
                  multiplication: {
                    instruction: "mult $t0, $t1",
                    meaning: "Multiply $t0 * $t1, result in lo/hi registers",
                    binary: "000000 01000 01001 00000 00000 011000",
                    funct: "011000 = 24 decimal = multiply operation",
                    result: "64-bit result: hi = upper 32 bits, lo = lower 32 bits"
                  },
                  division: {
                    instruction: "div $t0, $t1",
                    meaning: "Divide $t0 / $t1, quotient in lo, remainder in hi",
                    binary: "000000 01000 01001 00000 00000 011010",
                    funct: "011010 = 26 decimal = divide operation",
                    result: "lo = quotient, hi = remainder"
                  }
                },
                keyPoints: [
                  "All arithmetic instructions use R-format (6-bit opcode = 000000)",
                  "3-register format: rs (source1), rt (source2), rd (destination)",
                  "32-bit operations with overflow detection",
                  "Multiplication/division use special lo/hi registers for 64-bit results",
                  "Signed arithmetic with two's complement representation"
                ],
                registerUsage: {
                  source1: "rs field - first operand",
                  source2: "rt field - second operand", 
                  destination: "rd field - where result is stored",
                  special: "lo/hi registers for mult/div results"
                },
                overflowHandling: {
                  detection: "Overflow occurs when result exceeds 32-bit signed range",
                  range: "Valid range: -2,147,483,648 to +2,147,483,647",
                  exception: "Overflow triggers arithmetic overflow exception"
                }
              },
              {
                term: "Memory Instructions (Load/Store) - Complete Technical Analysis",
                layDefinition: "Instructions that move data between the CPU's fast storage (registers) and the slower main memory, like moving items between your desk and a filing cabinet.",
                technicalDefinition: "I-format instructions that transfer data between memory and registers using base+offset addressing. Memory address = base register + sign-extended immediate offset. All memory operations are byte-addressable.",
                preciseExamples: {
                  loadWord: {
                    instruction: "lw $t0, 4($sp)",
                    meaning: "Load 32-bit word from memory address ($sp + 4) into $t0",
                    binary: "100011 11101 01000 0000000000000100",
                    opcode: "100011 = 35 decimal = lw operation",
                    addressing: "Base = $sp (register 29), offset = 4 bytes",
                    memoryAccess: "Reads 4 bytes starting at address ($sp + 4)"
                  },
                  storeWord: {
                    instruction: "sw $t1, 8($gp)",
                    meaning: "Store 32-bit word from $t1 to memory address ($gp + 8)",
                    binary: "101011 11100 01001 0000000000001000",
                    opcode: "101011 = 43 decimal = sw operation",
                    addressing: "Base = $gp (register 28), offset = 8 bytes",
                    memoryAccess: "Writes 4 bytes starting at address ($gp + 8)"
                  },
                  loadByte: {
                    instruction: "lb $t2, 0($a0)",
                    meaning: "Load 8-bit byte from memory address ($a0 + 0) into $t2 (sign-extended)",
                    binary: "100000 00100 01010 0000000000000000",
                    opcode: "100000 = 32 decimal = lb operation",
                    addressing: "Base = $a0 (register 4), offset = 0 bytes",
                    signExtension: "8-bit value sign-extended to 32 bits"
                  },
                  storeByte: {
                    instruction: "sb $t3, 1($a1)",
                    meaning: "Store 8-bit byte from $t3 to memory address ($a1 + 1)",
                    binary: "101000 00101 01011 0000000000000001",
                    opcode: "101000 = 40 decimal = sb operation",
                    addressing: "Base = $a1 (register 5), offset = 1 byte",
                    truncation: "Only least significant 8 bits of $t3 are stored"
                  }
                },
                addressingModes: {
                  baseOffset: {
                    formula: "Effective Address = Base Register + Sign-Extended Immediate",
                    example: "lw $t0, 100($s0) → Address = $s0 + 100",
                    range: "Immediate range: -32,768 to +32,767 bytes"
                  },
                  alignment: {
                    words: "Word addresses must be divisible by 4 (0x0, 0x4, 0x8, 0xC)",
                    halfwords: "Halfword addresses must be divisible by 2 (0x0, 0x2, 0x4, 0x6)",
                    bytes: "Byte addresses can be any value (0x0, 0x1, 0x2, 0x3, etc.)"
                  }
                },
                dataTypes: {
                  word: {
                    size: "32 bits (4 bytes)",
                    instructions: ["lw", "sw"],
                    alignment: "Must be word-aligned (address % 4 = 0)"
                  },
                  halfword: {
                    size: "16 bits (2 bytes)", 
                    instructions: ["lh", "sh", "lhu"],
                    alignment: "Must be halfword-aligned (address % 2 = 0)",
                    signExtension: "lh sign-extends, lhu zero-extends"
                  },
                  byte: {
                    size: "8 bits (1 byte)",
                    instructions: ["lb", "sb", "lbu"],
                    alignment: "No alignment requirement",
                    signExtension: "lb sign-extends, lbu zero-extends"
                  }
                },
                keyPoints: [
                  "All memory instructions use I-format (6-bit opcode + 16-bit immediate)",
                  "Base+offset addressing: address = base register + immediate",
                  "Byte-addressable memory with word-aligned access for efficiency",
                  "Sign extension for signed loads (lb, lh), zero extension for unsigned (lbu, lhu)",
                  "Memory operations are atomic at the word level"
                ],
                memoryLayout: {
                  stack: "Grows downward from high addresses, $sp points to top",
                  heap: "Grows upward from low addresses, $gp points to global data",
                  text: "Contains program instructions, starts at 0x00400000",
                  data: "Contains global variables, starts at 0x10000000"
                }
              },
              {
                term: "Branch Instructions - Complete Technical Analysis",
                layDefinition: "Instructions that make the program 'jump' to different parts of the code based on whether certain conditions are true or false, like taking different paths in a maze based on what you find.",
                technicalDefinition: "I-format instructions that conditionally change the program counter (PC) using PC-relative addressing. Branch target address = PC + 4 + (sign-extended immediate << 2). All branches use 16-bit immediate field for target calculation.",
                preciseExamples: {
                  branchEqual: {
                    instruction: "beq $t0, $t1, loop_start",
                    meaning: "Branch to loop_start if $t0 equals $t1",
                    binary: "000100 01000 01001 0000000000001000",
                    opcode: "000100 = 4 decimal = beq operation",
                    condition: "Branch if rs == rt",
                    targetCalculation: "Target = PC + 4 + (immediate << 2)"
                  },
                  branchNotEqual: {
                    instruction: "bne $s0, $zero, continue",
                    meaning: "Branch to continue if $s0 is not equal to zero",
                    binary: "000101 10000 00000 0000000000000100",
                    opcode: "000101 = 5 decimal = bne operation",
                    condition: "Branch if rs != rt",
                    commonUse: "Loop termination: bne $t0, $zero, loop"
                  },
                  branchGreaterThanZero: {
                    instruction: "bgtz $t0, positive_branch",
                    meaning: "Branch to positive_branch if $t0 > 0",
                    binary: "000111 01000 00000 0000000000000010",
                    opcode: "000111 = 7 decimal = bgtz operation",
                    condition: "Branch if rs > 0 (rt must be 0)",
                    signedComparison: "Uses signed comparison (two's complement)"
                  },
                  branchLessOrEqualZero: {
                    instruction: "blez $t1, negative_or_zero",
                    meaning: "Branch to negative_or_zero if $t1 <= 0",
                    binary: "000110 01001 00000 0000000000000001",
                    opcode: "000110 = 6 decimal = blez operation",
                    condition: "Branch if rs <= 0 (rt must be 0)",
                    inclusive: "Includes zero in the condition"
                  }
                },
                addressingCalculation: {
                  pcRelative: {
                    formula: "Branch Target = PC + 4 + (Sign-Extended(immediate) << 2)",
                    explanation: "PC+4 is next instruction, immediate is shifted left 2 bits (multiply by 4) for word alignment",
                    range: "Branch range: ±128KB from current instruction"
                  },
                  example: {
                    currentPC: "0x00400000",
                    immediate: "0x0008 (8 decimal)",
                    calculation: "0x00400000 + 4 + (8 << 2) = 0x00400000 + 4 + 32 = 0x00400024",
                    result: "Branch target = 0x00400024"
                  }
                },
                branchTypes: {
                  equality: {
                    beq: "Branch if Equal - rs == rt",
                    bne: "Branch if Not Equal - rs != rt"
                  },
                  comparison: {
                    bgtz: "Branch if Greater Than Zero - rs > 0",
                    blez: "Branch if Less or Equal Zero - rs <= 0",
                    bltz: "Branch if Less Than Zero - rs < 0",
                    bgez: "Branch if Greater or Equal Zero - rs >= 0"
                  },
                  unsigned: {
                    bgtu: "Branch if Greater Than Unsigned - rs > rt",
                    bltu: "Branch if Less Than Unsigned - rs < rt"
                  }
                },
                keyPoints: [
                  "All branch instructions use I-format with 16-bit immediate",
                  "PC-relative addressing: target = PC + 4 + (immediate << 2)",
                  "Branch range: ±128KB from current instruction",
                  "Immediate field is sign-extended to 32 bits, then shifted left 2",
                  "Conditional execution based on register comparisons"
                ],
                pipelineConsiderations: {
                  branchDelay: "Branch decision made in ID stage, target calculated in EX stage",
                  branchPrediction: "Static prediction: not taken (fall through)",
                  branchTargetBuffer: "Caches target addresses for faster branch resolution"
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: "datapath",
      title: "Single-Cycle Datapath - Complete Technical Analysis",
      slides: [
        {
          title: "Datapath Components - Deep Technical Dive",
          content: {
            concepts: [
              {
                term: "Program Counter (PC) - Complete Technical Analysis",
                layDefinition: "The 'bookmark' that tells the CPU which instruction to execute next - it's like a pointer that moves through your program step by step.",
                technicalDefinition: "32-bit register that holds the memory address of the currently executing instruction. Updated every clock cycle to point to the next instruction. Central to instruction fetch and control flow.",
                preciseExamples: {
                  sequentialExecution: {
                    currentPC: "0x00400000",
                    nextPC: "0x00400004",
                    increment: "PC = PC + 4 (4 bytes per instruction)",
                    reason: "Each MIPS instruction is 32 bits (4 bytes)"
                  },
                  branchExecution: {
                    instruction: "beq $t0, $t1, loop",
                    currentPC: "0x00400008",
                    immediate: "0xFFFC (-4 in two's complement)",
                    calculation: "PC + 4 + (immediate << 2) = 0x0040000C + (-4 << 2) = 0x0040000C - 16 = 0x00400000",
                    result: "Branch target = 0x00400000 (back to loop)"
                  },
                  jumpExecution: {
                    instruction: "j main",
                    currentPC: "0x00400010",
                    address: "0x0000000A (26-bit address field)",
                    calculation: "Jump address = {PC+4[31:28], address, 2'b00} = {0x00400014[31:28], 0x0000000A, 00}",
                    result: "Jump target = 0x00400028"
                  }
                },
                keyPoints: [
                  "32-bit register holding instruction address",
                  "Incremented by 4 for sequential execution (4 bytes per instruction)",
                  "Updated for branches: PC + 4 + (immediate << 2)",
                  "Updated for jumps: {PC+4[31:28], address, 2'b00}",
                  "Critical for instruction fetch pipeline stage"
                ],
                timingConsiderations: {
                  clockEdge: "Updated on rising edge of clock",
                  setupTime: "Must be stable before instruction memory access",
                  holdTime: "Must remain stable during memory read"
                },
                controlSignals: {
                  pcWrite: "Enables PC update (1 = update, 0 = hold)",
                  pcSource: "Selects PC source (PC+4, branch target, jump target)",
                  branch: "Indicates branch instruction",
                  jump: "Indicates jump instruction"
                }
              },
              {
                term: "Instruction Memory - Complete Technical Analysis",
                layDefinition: "The 'instruction manual' that stores all the program's commands - the CPU reads from this to know what to do next.",
                technicalDefinition: "Read-only memory (ROM) that stores 32-bit MIPS instructions. Accessed using PC as address, outputs 32-bit instruction word. Critical component in instruction fetch stage of pipeline.",
                preciseExamples: {
                  instructionFetch: {
                    pcAddress: "0x00400000",
                    instruction: "0x8FA10004 (lw $at, 4($sp))",
                    memoryAccess: "Read 32-bit word from instruction memory",
                    timing: "Access time = 1 clock cycle"
                  },
                  instructionDecoding: {
                    rawInstruction: "0x8FA10004",
                    binary: "100011 11101 00001 0000000000000100",
                    opcode: "100011 = 35 decimal = lw",
                    rs: "11101 = $sp (register 29)",
                    rt: "00001 = $at (register 1)",
                    immediate: "0000000000000100 = 4 decimal"
                  }
                },
                keyPoints: [
                  "32-bit word-addressable read-only memory",
                  "PC provides 32-bit address input",
                  "Outputs 32-bit instruction word",
                  "Access time: 1 clock cycle",
                  "No write capability during execution"
                ],
                memoryCharacteristics: {
                  capacity: "2^32 words = 4GB instruction space",
                  wordSize: "32 bits per instruction",
                  alignment: "Word-aligned addresses (PC[1:0] = 00)",
                  accessTime: "1 clock cycle for read operation"
                },
                interfaceSignals: {
                  address: "32-bit PC input",
                  instruction: "32-bit instruction output",
                  readEnable: "Always enabled (read-only)",
                  clock: "Synchronous read on clock edge"
                }
              },
              {
                term: "Register File - Complete Technical Analysis",
                layDefinition: "The CPU's 'notebook' with 32 fast storage slots that can hold numbers and be read from or written to very quickly.",
                technicalDefinition: "32 registers (32 bits each) with 2 read ports and 1 write port. Register 0 is hardwired to zero. Read operations are combinational, write operations are clocked. Critical for data storage and ALU operations.",
                preciseExamples: {
                  registerRead: {
                    operation: "Read registers rs and rt",
                    rs: "5-bit source register 1 address",
                    rt: "5-bit source register 2 address",
                    readData1: "32-bit value from register rs",
                    readData2: "32-bit value from register rt",
                    timing: "Combinational - available in same clock cycle"
                  },
                  registerWrite: {
                    operation: "Write to register rd or rt",
                    writeReg: "5-bit destination register address",
                    writeData: "32-bit data to write",
                    regWrite: "Write enable signal (1 = write, 0 = no write)",
                    timing: "Clocked - written on rising edge of clock"
                  },
                  specialRegisters: {
                    zero: "$0 = 00000 - always contains 0, cannot be written",
                    returnAddress: "$ra = 11111 - stores return address for function calls",
                    stackPointer: "$sp = 11101 - points to top of stack",
                    framePointer: "$fp = 11110 - points to current stack frame"
                  }
                },
                keyPoints: [
                  "32 registers, each 32 bits wide",
                  "2 read ports, 1 write port (3-port design)",
                  "Register 0 hardwired to zero",
                  "Read operations are combinational",
                  "Write operations are clocked"
                ],
                portConfiguration: {
                  readPort1: "rs field → ReadData1 (32 bits)",
                  readPort2: "rt field → ReadData2 (32 bits)",
                  writePort: "WriteReg + WriteData + RegWrite → Register[WriteReg]"
                },
                timingCharacteristics: {
                  readAccess: "Combinational - no clock delay",
                  writeAccess: "Clocked - written on rising edge",
                  setupTime: "WriteData must be stable before clock edge",
                  holdTime: "WriteData must remain stable after clock edge"
                }
              },
              {
                term: "ALU (Arithmetic Logic Unit) - Complete Technical Analysis",
                layDefinition: "The CPU's 'calculator' that can add, subtract, compare, and do logical operations on numbers - it's the workhorse that does all the actual computation.",
                technicalDefinition: "Combinational circuit that performs arithmetic and logical operations on two 32-bit inputs. Produces 32-bit result and status flags. Controlled by 4-bit ALU control signal. Critical component in execution stage.",
                preciseExamples: {
                  arithmeticOperations: {
                    add: {
                      operation: "A + B",
                      aluControl: "0010",
                      result: "32-bit sum",
                      overflow: "Overflow flag if result exceeds 32-bit range"
                    },
                    subtract: {
                      operation: "A - B",
                      aluControl: "0110",
                      result: "32-bit difference",
                      zero: "Zero flag if result equals zero"
                    }
                  },
                  logicalOperations: {
                    and: {
                      operation: "A & B (bitwise AND)",
                      aluControl: "0000",
                      result: "32-bit bitwise AND"
                    },
                    or: {
                      operation: "A | B (bitwise OR)",
                      aluControl: "0001",
                      result: "32-bit bitwise OR"
                    },
                    xor: {
                      operation: "A ^ B (bitwise XOR)",
                      aluControl: "0011",
                      result: "32-bit bitwise XOR"
                    }
                  },
                  comparisonOperations: {
                    setOnLessThan: {
                      operation: "A < B (signed comparison)",
                      aluControl: "0111",
                      result: "1 if A < B, 0 otherwise",
                      usage: "Used for slt instruction"
                    },
                    setOnLessThanUnsigned: {
                      operation: "A < B (unsigned comparison)",
                      aluControl: "1111",
                      result: "1 if A < B, 0 otherwise",
                      usage: "Used for sltu instruction"
                    }
                  }
                },
                aluControlSignals: {
                  "0000": "AND operation",
                  "0001": "OR operation", 
                  "0010": "ADD operation",
                  "0011": "XOR operation",
                  "0110": "SUBTRACT operation",
                  "0111": "SET-ON-LESS-THAN (signed)",
                  "1111": "SET-ON-LESS-THAN (unsigned)"
                },
                outputFlags: {
                  zero: "1 if result equals zero, 0 otherwise",
                  overflow: "1 if arithmetic overflow occurred, 0 otherwise",
                  carry: "1 if carry out occurred, 0 otherwise"
                },
                keyPoints: [
                  "Two 32-bit inputs, one 32-bit output",
                  "4-bit control signal determines operation",
                  "Produces status flags (zero, overflow, carry)",
                  "Combinational logic - no clock delay",
                  "Critical path component for timing"
                ],
                timingConsiderations: {
                  propagationDelay: "Must be fast enough for single cycle",
                  criticalPath: "Often on critical timing path",
                  setupTime: "Result must be stable before clock edge"
                }
              },
              {
                term: "Data Memory - Complete Technical Analysis",
                layDefinition: "The CPU's 'storage warehouse' where data is kept when not being actively worked on - slower than registers but much larger capacity.",
                technicalDefinition: "Read/write memory for data storage. Accessed by load and store instructions. 32-bit word-addressable with byte-level addressing. Separate from instruction memory for simultaneous access.",
                preciseExamples: {
                  memoryRead: {
                    instruction: "lw $t0, 4($sp)",
                    address: "$sp + 4 (calculated by ALU)",
                    data: "32-bit word read from memory",
                    timing: "1 clock cycle access time"
                  },
                  memoryWrite: {
                    instruction: "sw $t1, 8($gp)",
                    address: "$gp + 8 (calculated by ALU)",
                    data: "32-bit word from $t1",
                    timing: "1 clock cycle write time"
                  },
                  byteOperations: {
                    loadByte: "lb $t2, 0($a0) - loads 8 bits, sign-extends to 32",
                    storeByte: "sb $t3, 1($a1) - stores 8 bits from $t3"
                  }
                },
                keyPoints: [
                  "32-bit word-addressable memory",
                  "Separate from instruction memory",
                  "Accessed by load/store instructions",
                  "1 clock cycle access time",
                  "Byte-level addressing with word alignment"
                ],
                memoryInterface: {
                  address: "32-bit memory address",
                  writeData: "32-bit data to write",
                  readData: "32-bit data read from memory",
                  memRead: "Read enable signal",
                  memWrite: "Write enable signal"
                },
                memoryLayout: {
                  stack: "Grows downward, $sp points to top",
                  heap: "Grows upward, $gp points to global data",
                  data: "Global variables, starts at 0x10000000"
                }
              }
            ]
          }
        },
        {
          title: "Control Unit - Complete Technical Analysis",
          content: {
            concepts: [
              {
                term: "Control Unit - Complete Technical Analysis",
                layDefinition: "The 'traffic controller' of the CPU that reads each instruction and tells all the other parts what to do - like a conductor directing an orchestra.",
                technicalDefinition: "Combinational logic circuit that decodes instruction opcode and generates control signals for all datapath components. Takes 6-bit opcode as input, produces control signals for ALU, memory, registers, and multiplexers.",
                preciseExamples: {
                  rTypeInstruction: {
                    instruction: "add $t0, $t1, $t2",
                    opcode: "000000",
                    controlSignals: {
                      regDst: "1 (rd field for destination)",
                      aluSrc: "0 (register value for ALU)",
                      memToReg: "0 (ALU result to register)",
                      regWrite: "1 (write to register file)",
                      memRead: "0 (no memory read)",
                      memWrite: "0 (no memory write)",
                      branch: "0 (not a branch)",
                      jump: "0 (not a jump)",
                      aluOp: "10 (R-type ALU operation)"
                    }
                  },
                  loadInstruction: {
                    instruction: "lw $t0, 4($sp)",
                    opcode: "100011",
                    controlSignals: {
                      regDst: "0 (rt field for destination)",
                      aluSrc: "1 (immediate for ALU)",
                      memToReg: "1 (memory data to register)",
                      regWrite: "1 (write to register file)",
                      memRead: "1 (read from data memory)",
                      memWrite: "0 (no memory write)",
                      branch: "0 (not a branch)",
                      jump: "0 (not a jump)",
                      aluOp: "00 (add for address calculation)"
                    }
                  },
                  branchInstruction: {
                    instruction: "beq $t0, $t1, label",
                    opcode: "000100",
                    controlSignals: {
                      regDst: "X (don't care)",
                      aluSrc: "0 (register values for comparison)",
                      memToReg: "X (don't care)",
                      regWrite: "0 (no register write)",
                      memRead: "0 (no memory read)",
                      memWrite: "0 (no memory write)",
                      branch: "1 (branch instruction)",
                      jump: "0 (not a jump)",
                      aluOp: "01 (subtract for comparison)"
                    }
                  }
                },
                controlSignalDefinitions: {
                  regDst: {
                    purpose: "Selects destination register (rd vs rt)",
                    values: "0 = rt field, 1 = rd field",
                    usage: "R-type uses rd, I-type uses rt"
                  },
                  aluSrc: {
                    purpose: "Selects ALU second input (register vs immediate)",
                    values: "0 = register value, 1 = immediate value",
                    usage: "R-type uses register, I-type uses immediate"
                  },
                  memToReg: {
                    purpose: "Selects register write data source",
                    values: "0 = ALU result, 1 = memory data",
                    usage: "Normal ops use ALU, loads use memory"
                  },
                  regWrite: {
                    purpose: "Enables register file write",
                    values: "0 = no write, 1 = write enabled",
                    usage: "Most instructions write to registers"
                  },
                  memRead: {
                    purpose: "Enables data memory read",
                    values: "0 = no read, 1 = read enabled",
                    usage: "Only load instructions read memory"
                  },
                  memWrite: {
                    purpose: "Enables data memory write",
                    values: "0 = no write, 1 = write enabled",
                    usage: "Only store instructions write memory"
                  },
                  branch: {
                    purpose: "Indicates branch instruction",
                    values: "0 = not branch, 1 = branch",
                    usage: "Used with ALU zero flag for branch decision"
                  },
                  jump: {
                    purpose: "Indicates jump instruction",
                    values: "0 = not jump, 1 = jump",
                    usage: "Overrides PC source selection"
                  },
                  aluOp: {
                    purpose: "ALU operation control",
                    values: "00 = add, 01 = subtract, 10 = R-type funct",
                    usage: "Determines ALU operation type"
                  }
                },
                keyPoints: [
                  "Decodes 6-bit opcode to generate control signals",
                  "9 primary control signals control datapath",
                  "Combinational logic - no state storage",
                  "Critical path component for timing",
                  "Must be fast to avoid clock cycle delays"
                ],
                timingConsiderations: {
                  propagationDelay: "Must be fast enough for single cycle",
                  setupTime: "Signals must be stable before clock edge",
                  holdTime: "Signals must remain stable during clock",
                  criticalPath: "Often on critical timing path"
                }
              },
              {
                term: "ALU Control - Complete Technical Analysis",
                layDefinition: "The 'fine-tuner' that tells the ALU exactly which operation to perform - like choosing between addition, subtraction, or comparison.",
                technicalDefinition: "Combinational circuit that generates 4-bit ALU control signal based on ALUOp control signal and funct field. Determines specific ALU operation for R-type instructions and provides appropriate control for I-type instructions.",
                preciseExamples: {
                  rTypeOperations: {
                    add: {
                      aluOp: "10 (R-type)",
                      funct: "100000",
                      aluControl: "0010 (ADD)",
                      operation: "A + B"
                    },
                    subtract: {
                      aluOp: "10 (R-type)",
                      funct: "100010",
                      aluControl: "0110 (SUBTRACT)",
                      operation: "A - B"
                    },
                    and: {
                      aluOp: "10 (R-type)",
                      funct: "100100",
                      aluControl: "0000 (AND)",
                      operation: "A & B"
                    },
                    or: {
                      aluOp: "10 (R-type)",
                      funct: "100101",
                      aluControl: "0001 (OR)",
                      operation: "A | B"
                    },
                    slt: {
                      aluOp: "10 (R-type)",
                      funct: "101010",
                      aluControl: "0111 (SET-ON-LESS-THAN)",
                      operation: "A < B ? 1 : 0"
                    }
                  },
                  iTypeOperations: {
                    loadWord: {
                      aluOp: "00 (I-type)",
                      funct: "XXXXXX (don't care)",
                      aluControl: "0010 (ADD)",
                      operation: "Base + Offset"
                    },
                    storeWord: {
                      aluOp: "00 (I-type)",
                      funct: "XXXXXX (don't care)",
                      aluControl: "0010 (ADD)",
                      operation: "Base + Offset"
                    },
                    branchEqual: {
                      aluOp: "01 (Branch)",
                      funct: "XXXXXX (don't care)",
                      aluControl: "0110 (SUBTRACT)",
                      operation: "A - B (for comparison)"
                    }
                  }
                },
                aluControlTruthTable: {
                  "0000": "AND operation",
                  "0001": "OR operation",
                  "0010": "ADD operation",
                  "0011": "XOR operation",
                  "0110": "SUBTRACT operation",
                  "0111": "SET-ON-LESS-THAN (signed)",
                  "1111": "SET-ON-LESS-THAN (unsigned)"
                },
                keyPoints: [
                  "Takes ALUOp[1:0] and funct[5:0] as inputs",
                  "Produces 4-bit ALU control output",
                  "Handles R-type, I-type, and branch instructions",
                  "Combinational logic - no clock delay",
                  "Critical for proper ALU operation"
                ],
                inputOutputMapping: {
                  inputs: {
                    aluOp: "2-bit control from main control unit",
                    funct: "6-bit function field from R-type instructions"
                  },
                  output: "4-bit ALU control signal"
                }
              }
            ]
          }
        }
      ]
    }
  ],
  flashcards: [
    // MIPS Instruction Formats
    {
      term: "R-format Instruction",
      definition: "32-bit instruction format: 6-bit opcode (000000), 5-bit rs, 5-bit rt, 5-bit rd, 5-bit shamt, 6-bit funct. Used for register-to-register operations like add, sub, and, or, slt.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "I-format Instruction", 
      definition: "32-bit instruction format: 6-bit opcode, 5-bit rs, 5-bit rt, 16-bit immediate. Used for arithmetic with constants (addi), memory operations (lw, sw), and branches (beq, bne).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "J-format Instruction",
      definition: "32-bit instruction format: 6-bit opcode (000010 for j, 000011 for jal), 26-bit address. Used for unconditional jumps and function calls. Jump address = {PC+4[31:28], address, 2'b00}.",
      category: "assembly", 
      difficulty: "medium"
    },
    {
      term: "Opcode Field",
      definition: "6-bit field (bits 31-26) that identifies the instruction type. 000000 for R-type, varies for I-type and J-type instructions.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "Funct Field",
      definition: "6-bit field (bits 5-0) in R-type instructions that specifies the exact operation. Examples: 100000=add, 100010=sub, 100100=and, 100101=or.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "Immediate Field",
      definition: "16-bit field (bits 15-0) in I-type instructions containing a constant value. Sign-extended to 32 bits for arithmetic operations.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "Sign Extension",
      definition: "Process of extending a signed number to a larger bit width by replicating the sign bit. 16-bit immediate becomes 32-bit by copying bit 15 to bits 31-16.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "Zero Extension",
      definition: "Process of extending an unsigned number to a larger bit width by adding zeros. Used for unsigned loads (lbu, lhu).",
      category: "assembly",
      difficulty: "hard"
    },
    
    // MIPS Registers
    {
      term: "$zero Register",
      definition: "Register 0, always contains the value 0. Cannot be written to. Used for constants and comparisons.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "$at Register",
      definition: "Register 1, assembler temporary. Used by the assembler for pseudo-instructions and complex operations.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "$v0-$v1 Registers",
      definition: "Registers 2-3, value registers. Used to return values from functions. $v0 typically holds the return value.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "$a0-$a3 Registers",
      definition: "Registers 4-7, argument registers. Used to pass arguments to functions. First 4 function arguments.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "$t0-$t7 Registers",
      definition: "Registers 8-15, temporary registers. Caller-saved, can be used freely in functions without saving.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "$s0-$s7 Registers",
      definition: "Registers 16-23, saved registers. Callee-saved, must be preserved across function calls.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "$t8-$t9 Registers",
      definition: "Registers 24-25, additional temporary registers. Caller-saved, used for more temporary storage.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "$k0-$k1 Registers",
      definition: "Registers 26-27, kernel registers. Reserved for operating system use, typically for exception handling.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "$gp Register",
      definition: "Register 28, global pointer. Points to the middle of the global data area for efficient access to global variables.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "$sp Register",
      definition: "Register 29, stack pointer. Points to the top of the stack. Decremented when pushing, incremented when popping.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "$fp Register",
      definition: "Register 30, frame pointer. Points to the current stack frame. Used for accessing local variables and parameters.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "$ra Register",
      definition: "Register 31, return address. Stores the address to return to after a function call. Set by jal instruction.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Arithmetic Instructions
    {
      term: "add Instruction",
      definition: "R-type: add $rd, $rs, $rt. Adds two registers and stores result in destination. $rd = $rs + $rt. Opcode: 000000, funct: 100000.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sub Instruction",
      definition: "R-type: sub $rd, $rs, $rt. Subtracts two registers and stores result in destination. $rd = $rs - $rt. Opcode: 000000, funct: 100010.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "addi Instruction",
      definition: "I-type: addi $rt, $rs, immediate. Adds register and immediate value. $rt = $rs + immediate. Opcode: 001000.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "addiu Instruction",
      definition: "I-type: addiu $rt, $rs, immediate. Adds register and immediate value (unsigned). $rt = $rs + immediate. Opcode: 001001.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "mult Instruction",
      definition: "R-type: mult $rs, $rt. Multiplies two registers, stores 64-bit result in hi and lo registers. Opcode: 000000, funct: 011000.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "div Instruction",
      definition: "R-type: div $rs, $rt. Divides $rs by $rt, stores quotient in lo and remainder in hi. Opcode: 000000, funct: 011010.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "mfhi Instruction",
      definition: "R-type: mfhi $rd. Moves value from hi register to destination register. $rd = hi. Opcode: 000000, funct: 010000.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "mflo Instruction",
      definition: "R-type: mflo $rd. Moves value from lo register to destination register. $rd = lo. Opcode: 000000, funct: 010010.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "slt Instruction",
      definition: "R-type: slt $rd, $rs, $rt. Set on less than. $rd = 1 if $rs < $rt, else 0. Opcode: 000000, funct: 101010.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "slti Instruction",
      definition: "I-type: slti $rt, $rs, immediate. Set on less than immediate. $rt = 1 if $rs < immediate, else 0. Opcode: 001010.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Logical Instructions
    {
      term: "and Instruction",
      definition: "R-type: and $rd, $rs, $rt. Bitwise AND of two registers. $rd = $rs & $rt. Opcode: 000000, funct: 100100.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "or Instruction",
      definition: "R-type: or $rd, $rs, $rt. Bitwise OR of two registers. $rd = $rs | $rt. Opcode: 000000, funct: 100101.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "xor Instruction",
      definition: "R-type: xor $rd, $rs, $rt. Bitwise XOR of two registers. $rd = $rs ^ $rt. Opcode: 000000, funct: 100110.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "nor Instruction",
      definition: "R-type: nor $rd, $rs, $rt. Bitwise NOR of two registers. $rd = ~($rs | $rt). Opcode: 000000, funct: 100111.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "andi Instruction",
      definition: "I-type: andi $rt, $rs, immediate. Bitwise AND of register and immediate. $rt = $rs & immediate. Opcode: 001100.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "ori Instruction",
      definition: "I-type: ori $rt, $rs, immediate. Bitwise OR of register and immediate. $rt = $rs | immediate. Opcode: 001101.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "xori Instruction",
      definition: "I-type: xori $rt, $rs, immediate. Bitwise XOR of register and immediate. $rt = $rs ^ immediate. Opcode: 001110.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Shift Instructions
    {
      term: "sll Instruction",
      definition: "R-type: sll $rd, $rt, shamt. Shift left logical. $rd = $rt << shamt. Opcode: 000000, funct: 000000.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "srl Instruction",
      definition: "R-type: srl $rd, $rt, shamt. Shift right logical. $rd = $rt >> shamt. Opcode: 000000, funct: 000010.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sra Instruction",
      definition: "R-type: sra $rd, $rt, shamt. Shift right arithmetic. $rd = $rt >> shamt (sign-extended). Opcode: 000000, funct: 000011.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "sllv Instruction",
      definition: "R-type: sllv $rd, $rt, $rs. Shift left logical variable. $rd = $rt << $rs. Opcode: 000000, funct: 000100.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "srlv Instruction",
      definition: "R-type: srlv $rd, $rt, $rs. Shift right logical variable. $rd = $rt >> $rs. Opcode: 000000, funct: 000110.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "srav Instruction",
      definition: "R-type: srav $rd, $rt, $rs. Shift right arithmetic variable. $rd = $rt >> $rs (sign-extended). Opcode: 000000, funct: 000111.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Memory Instructions
    {
      term: "lw Instruction",
      definition: "I-type: lw $rt, offset($rs). Load word from memory. $rt = Memory[$rs + offset]. Opcode: 100011.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sw Instruction",
      definition: "I-type: sw $rt, offset($rs). Store word to memory. Memory[$rs + offset] = $rt. Opcode: 101011.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lh Instruction",
      definition: "I-type: lh $rt, offset($rs). Load halfword from memory (sign-extended). $rt = Memory[$rs + offset]. Opcode: 100001.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sh Instruction",
      definition: "I-type: sh $rt, offset($rs). Store halfword to memory. Memory[$rs + offset] = $rt[15:0]. Opcode: 101001.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "lb Instruction",
      definition: "I-type: lb $rt, offset($rs). Load byte from memory (sign-extended). $rt = Memory[$rs + offset]. Opcode: 100000.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sb Instruction",
      definition: "I-type: sb $rt, offset($rs). Store byte to memory. Memory[$rs + offset] = $rt[7:0]. Opcode: 101000.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "lbu Instruction",
      definition: "I-type: lbu $rt, offset($rs). Load byte from memory (zero-extended). $rt = Memory[$rs + offset]. Opcode: 100100.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "lhu Instruction",
      definition: "I-type: lhu $rt, offset($rs). Load halfword from memory (zero-extended). $rt = Memory[$rs + offset]. Opcode: 100101.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Branch Instructions
    {
      term: "beq Instruction",
      definition: "I-type: beq $rs, $rt, label. Branch if equal. If $rs == $rt, branch to label. Opcode: 000100.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne Instruction",
      definition: "I-type: bne $rs, $rt, label. Branch if not equal. If $rs != $rt, branch to label. Opcode: 000101.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bgtz Instruction",
      definition: "I-type: bgtz $rs, label. Branch if greater than zero. If $rs > 0, branch to label. Opcode: 000111.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "blez Instruction",
      definition: "I-type: blez $rs, label. Branch if less than or equal to zero. If $rs <= 0, branch to label. Opcode: 000110.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bltz Instruction",
      definition: "I-type: bltz $rs, label. Branch if less than zero. If $rs < 0, branch to label. Opcode: 000001.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bgez Instruction",
      definition: "I-type: bgez $rs, label. Branch if greater than or equal to zero. If $rs >= 0, branch to label. Opcode: 000001.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Jump Instructions
    {
      term: "j Instruction",
      definition: "J-type: j target. Unconditional jump to target address. PC = {PC+4[31:28], target, 2'b00}. Opcode: 000010.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "jal Instruction",
      definition: "J-type: jal target. Jump and link. $ra = PC+4, then jump to target. Used for function calls. Opcode: 000011.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "jr Instruction",
      definition: "R-type: jr $rs. Jump register. PC = $rs. Used for function returns. Opcode: 000000, funct: 001000.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "jalr Instruction",
      definition: "R-type: jalr $rd, $rs. Jump and link register. $rd = PC+4, PC = $rs. Opcode: 000000, funct: 001001.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Datapath Components
    {
      term: "Program Counter (PC)",
      definition: "32-bit register that holds the address of the currently executing instruction. Incremented by 4 for sequential execution, updated for branches and jumps.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      term: "Instruction Memory",
      definition: "Read-only memory that stores 32-bit MIPS instructions. Accessed using PC as address, outputs 32-bit instruction word. Critical component in instruction fetch stage.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      term: "Register File",
      definition: "32 registers (32 bits each) with 2 read ports and 1 write port. Register 0 is hardwired to zero. Read operations are combinational, write operations are clocked.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "ALU (Arithmetic Logic Unit)",
      definition: "Combinational circuit that performs arithmetic and logical operations on two 32-bit inputs. Produces 32-bit result and status flags. Controlled by 4-bit ALU control signal.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "Data Memory",
      definition: "Read/write memory for data storage. Accessed by load and store instructions. 32-bit word-addressable with byte-level addressing. Separate from instruction memory.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "Sign Extend",
      definition: "Component that extends 16-bit immediate values to 32 bits by replicating the sign bit. Used for I-type instructions with signed immediates.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "Shift Left 2",
      definition: "Component that shifts the 26-bit jump address left by 2 bits for word alignment. Used in J-type instruction address calculation.",
      category: "datapath",
      difficulty: "hard"
    },
    {
      term: "PC+4 Adder",
      definition: "Component that adds 4 to the current PC value for sequential instruction execution. Each instruction is 4 bytes (32 bits).",
      category: "datapath",
      difficulty: "easy"
    },
    {
      term: "Branch Adder",
      definition: "Component that calculates branch target address by adding PC+4 to the sign-extended and shifted immediate value.",
      category: "datapath",
      difficulty: "hard"
    },
    
    // Control Unit
    {
      term: "Control Unit",
      definition: "Combinational logic circuit that decodes instruction opcode and generates control signals for all datapath components. Takes 6-bit opcode as input, produces 9 control signals.",
      category: "control",
      difficulty: "hard"
    },
    {
      term: "ALU Control",
      definition: "Combinational circuit that generates 4-bit ALU control signal based on ALUOp control signal and funct field. Determines specific ALU operation for different instruction types.",
      category: "control",
      difficulty: "hard"
    },
    {
      term: "regDst Control Signal",
      definition: "Control signal that selects destination register. 0 = rt field (I-type), 1 = rd field (R-type). Controls the multiplexer before register file write address input.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "aluSrc Control Signal",
      definition: "Control signal that selects ALU second input. 0 = register value (R-type), 1 = immediate value (I-type). Controls the multiplexer before ALU second input.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "memToReg Control Signal",
      definition: "Control signal that selects register write data source. 0 = ALU result (R-type, I-type), 1 = memory data (load). Controls the multiplexer before register file write data input.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "regWrite Control Signal",
      definition: "Control signal that enables register file write. 0 = no write, 1 = write enabled. Controls whether data is written to the register file.",
      category: "control",
      difficulty: "easy"
    },
    {
      term: "memRead Control Signal",
      definition: "Control signal that enables data memory read. 0 = no read, 1 = read enabled. Only load instructions (lw, lh, lb, lbu, lhu) read from data memory.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "memWrite Control Signal",
      definition: "Control signal that enables data memory write. 0 = no write, 1 = write enabled. Only store instructions (sw, sh, sb) write to data memory.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "branch Control Signal",
      definition: "Control signal that indicates branch instruction. 0 = not branch, 1 = branch. Used with ALU zero flag to determine if branch should be taken.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "jump Control Signal",
      definition: "Control signal that indicates jump instruction. 0 = not jump, 1 = jump. Overrides PC source selection for unconditional jumps.",
      category: "control",
      difficulty: "medium"
    },
    {
      term: "aluOp Control Signal",
      definition: "2-bit control signal that determines ALU operation type. 00 = add (lw, sw), 01 = subtract (beq, bne), 10 = R-type funct field determines operation.",
      category: "control",
      difficulty: "hard"
    },
    
    // ALU Operations
    {
      term: "ALU AND Operation",
      definition: "ALU control = 0000. Performs bitwise AND operation: result = A & B. Used for and instruction.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "ALU OR Operation",
      definition: "ALU control = 0001. Performs bitwise OR operation: result = A | B. Used for or instruction.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "ALU ADD Operation",
      definition: "ALU control = 0010. Performs addition: result = A + B. Used for add, addi, lw, sw instructions.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      term: "ALU SUBTRACT Operation",
      definition: "ALU control = 0110. Performs subtraction: result = A - B. Used for sub, beq, bne instructions.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      term: "ALU SLT Operation",
      definition: "ALU control = 0111. Set on less than: result = (A < B) ? 1 : 0. Used for slt instruction with signed comparison.",
      category: "datapath",
      difficulty: "hard"
    },
    {
      term: "ALU SLTU Operation",
      definition: "ALU control = 1111. Set on less than unsigned: result = (A < B) ? 1 : 0. Used for sltu instruction with unsigned comparison.",
      category: "datapath",
      difficulty: "hard"
    },
    {
      term: "ALU Zero Flag",
      definition: "Status flag that indicates if ALU result equals zero. Used by branch instructions to determine if branch should be taken.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      term: "ALU Overflow Flag",
      definition: "Status flag that indicates if arithmetic overflow occurred. Used for overflow detection in arithmetic operations.",
      category: "datapath",
      difficulty: "hard"
    },
    
    // Memory Organization
    {
      term: "Text Segment",
      definition: "Memory segment that contains program instructions. Starts at address 0x00400000. Read-only during execution.",
      category: "memory",
      difficulty: "easy"
    },
    {
      term: "Data Segment",
      definition: "Memory segment that contains global variables and static data. Starts at address 0x10000000. Read/write access.",
      category: "memory",
      difficulty: "easy"
    },
    {
      term: "Stack Segment",
      definition: "Memory segment that grows downward from high addresses. Used for function calls, local variables, and parameters. $sp points to top.",
      category: "memory",
      difficulty: "medium"
    },
    {
      term: "Heap Segment",
      definition: "Memory segment that grows upward from low addresses. Used for dynamic memory allocation. $gp points to global data area.",
      category: "memory",
      difficulty: "medium"
    },
    {
      term: "Word Alignment",
      definition: "Requirement that word addresses be divisible by 4. Ensures efficient memory access and prevents alignment exceptions.",
      category: "memory",
      difficulty: "medium"
    },
    {
      term: "Byte Addressing",
      definition: "Memory addressing scheme where each byte has a unique address. Word addresses are byte addresses divisible by 4.",
      category: "memory",
      difficulty: "medium"
    },
    {
      term: "Big Endian",
      definition: "Byte ordering where the most significant byte is stored at the lowest address. MIPS can be configured for big or little endian.",
      category: "memory",
      difficulty: "hard"
    },
    {
      term: "Little Endian",
      definition: "Byte ordering where the least significant byte is stored at the lowest address. More common in modern systems.",
      category: "memory",
      difficulty: "hard"
    },
    
    // Pipeline Concepts
    {
      term: "Instruction Fetch (IF)",
      definition: "First pipeline stage that fetches instruction from instruction memory using PC. Updates PC to PC+4 for next instruction.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      term: "Instruction Decode (ID)",
      definition: "Second pipeline stage that decodes instruction, reads register values, and generates control signals. Also calculates branch target.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      term: "Execute (EX)",
      definition: "Third pipeline stage that performs ALU operations, calculates memory addresses, and determines branch outcomes.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      term: "Memory Access (MEM)",
      definition: "Fourth pipeline stage that accesses data memory for load and store instructions. Passes ALU result for other instructions.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      term: "Write Back (WB)",
      definition: "Fifth pipeline stage that writes results back to register file. ALU result or memory data written to destination register.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      term: "Pipeline Hazard",
      definition: "Situation that prevents the next instruction from executing in its designated clock cycle. Types: structural, data, control hazards.",
      category: "pipeline",
      difficulty: "hard"
    },
    {
      term: "Data Hazard",
      definition: "Pipeline hazard caused by data dependencies between instructions. Occurs when an instruction depends on the result of a previous instruction.",
      category: "pipeline",
      difficulty: "hard"
    },
    {
      term: "Control Hazard",
      definition: "Pipeline hazard caused by branch instructions. Pipeline must be flushed and restarted when branch is taken.",
      category: "pipeline",
      difficulty: "hard"
    },
    {
      term: "Forwarding",
      definition: "Technique to resolve data hazards by forwarding results from later pipeline stages to earlier stages that need the data.",
      category: "pipeline",
      difficulty: "hard"
    },
    {
      term: "Branch Prediction",
      definition: "Technique to predict whether a branch will be taken or not taken to avoid control hazards. Static or dynamic prediction methods.",
      category: "pipeline",
      difficulty: "hard"
    },
    
    // Exception Handling
    {
      term: "Exception",
      definition: "Event that requires special handling by the processor. Examples: arithmetic overflow, invalid instruction, memory access violation.",
      category: "exception",
      difficulty: "medium"
    },
    {
      term: "Interrupt",
      definition: "External event that requires processor attention. Examples: timer interrupt, I/O device ready, system call.",
      category: "exception",
      difficulty: "medium"
    },
    {
      term: "Exception Vector",
      definition: "Memory address where exception handling code is located. Different exceptions jump to different vector addresses.",
      category: "exception",
      difficulty: "hard"
    },
    {
      term: "Exception Cause Register",
      definition: "Special register that indicates the reason for an exception. Used by exception handler to determine appropriate response.",
      category: "exception",
      difficulty: "hard"
    },
    {
      term: "Exception Program Counter",
      definition: "Special register that saves the address of the instruction that caused the exception. Used for returning after exception handling.",
      category: "exception",
      difficulty: "hard"
    },
    {
      term: "Exception Handler",
      definition: "Software routine that processes exceptions. Determines cause and takes appropriate action (halt, retry, etc.).",
      category: "exception",
      difficulty: "medium"
    },
    {
      term: "System Call",
      definition: "Mechanism for user programs to request services from the operating system. Implemented using syscall instruction.",
      category: "exception",
      difficulty: "medium"
    },
    {
      term: "Trap",
      definition: "Exception caused by a specific instruction (syscall, break). Used for system calls and debugging.",
      category: "exception",
      difficulty: "hard"
    },
    
    // Performance and Optimization
    {
      term: "Clock Cycle",
      definition: "Basic unit of time in a processor. All operations are synchronized to clock edges. Clock frequency determines processor speed.",
      category: "performance",
      difficulty: "easy"
    },
    {
      term: "CPI (Cycles Per Instruction)",
      definition: "Average number of clock cycles required to execute an instruction. Lower CPI means better performance.",
      category: "performance",
      difficulty: "medium"
    },
    {
      term: "MIPS (Million Instructions Per Second)",
      definition: "Performance metric measuring millions of instructions executed per second. MIPS = (Clock Rate) / (CPI × 10^6).",
      category: "performance",
      difficulty: "medium"
    },
    {
      term: "Cache Memory",
      definition: "Small, fast memory that stores frequently accessed data and instructions. Reduces average memory access time.",
      category: "performance",
      difficulty: "medium"
    },
    {
      term: "Cache Hit",
      definition: "Situation where requested data is found in cache. Results in fast access time.",
      category: "performance",
      difficulty: "medium"
    },
    {
      term: "Cache Miss",
      definition: "Situation where requested data is not found in cache. Results in slower access to main memory.",
      category: "performance",
      difficulty: "medium"
    },
    {
      term: "Cache Line",
      definition: "Unit of data transfer between cache and main memory. Typically 32 or 64 bytes.",
      category: "performance",
      difficulty: "hard"
    },
    {
      term: "Cache Associativity",
      definition: "Number of cache lines that can be stored in each cache set. Direct-mapped (1), set-associative (2-8), fully associative (all).",
      category: "performance",
      difficulty: "hard"
    },
    {
      term: "TLB (Translation Lookaside Buffer)",
      definition: "Cache for virtual-to-physical address translations. Reduces address translation overhead.",
      category: "performance",
      difficulty: "hard"
    },
    {
      term: "Branch Target Buffer",
      definition: "Cache that stores target addresses of previously executed branches. Improves branch prediction accuracy.",
      category: "performance",
      difficulty: "hard"
    },
    
    // Advanced Topics
    {
      term: "Superscalar Processor",
      definition: "Processor that can execute multiple instructions simultaneously in a single clock cycle. Requires multiple execution units.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Out-of-Order Execution",
      definition: "Technique that allows instructions to execute in a different order than they appear in the program, as long as dependencies are preserved.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Speculative Execution",
      definition: "Technique that executes instructions before it is known whether they should be executed. Used for branch prediction.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Register Renaming",
      definition: "Technique that maps architectural registers to physical registers to eliminate false data dependencies and enable out-of-order execution.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Tomasulo Algorithm",
      definition: "Algorithm for implementing out-of-order execution using reservation stations and register renaming.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Branch Prediction Accuracy",
      definition: "Percentage of branch predictions that are correct. Higher accuracy reduces control hazards and improves performance.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Instruction-Level Parallelism",
      definition: "Measure of how many instructions can be executed simultaneously. Limited by data dependencies and control flow.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Memory Hierarchy",
      definition: "Organization of memory systems from fastest/smallest (registers) to slowest/largest (disk). Includes registers, cache, main memory, disk.",
      category: "advanced",
      difficulty: "medium"
    },
    {
      term: "Virtual Memory",
      definition: "Technique that allows programs to use more memory than physically available by using disk storage as an extension of main memory.",
      category: "advanced",
      difficulty: "hard"
    },
    {
      term: "Page Fault",
      definition: "Exception that occurs when a program tries to access a page that is not currently in main memory. Requires loading page from disk.",
      category: "advanced",
      difficulty: "hard"
    },
    
    // Additional MIPS Instructions
    {
      term: "sltu Instruction",
      definition: "R-type: sltu $rd, $rs, $rt. Set on less than unsigned. $rd = 1 if $rs < $rt (unsigned), else 0. Opcode: 000000, funct: 101011.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "sltiu Instruction",
      definition: "I-type: sltiu $rt, $rs, immediate. Set on less than immediate unsigned. $rt = 1 if $rs < immediate (unsigned), else 0. Opcode: 001011.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "sllv Instruction",
      definition: "R-type: sllv $rd, $rt, $rs. Shift left logical variable. $rd = $rt << $rs. Opcode: 000000, funct: 000100.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "srlv Instruction",
      definition: "R-type: srlv $rd, $rt, $rs. Shift right logical variable. $rd = $rt >> $rs. Opcode: 000000, funct: 000110.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "srav Instruction",
      definition: "R-type: srav $rd, $rt, $rs. Shift right arithmetic variable. $rd = $rt >> $rs (sign-extended). Opcode: 000000, funct: 000111.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "syscall Instruction",
      definition: "R-type: syscall. System call instruction. Triggers exception to request OS services. Opcode: 000000, funct: 001100.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "break Instruction",
      definition: "R-type: break. Breakpoint instruction. Triggers exception for debugging. Opcode: 000000, funct: 001101.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "nop Instruction",
      definition: "R-type: nop. No operation. Does nothing, used for padding. Equivalent to sll $zero, $zero, 0. Opcode: 000000, funct: 000000.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lwl Instruction",
      definition: "I-type: lwl $rt, offset($rs). Load word left. Loads left part of word from unaligned address. Opcode: 100010.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "lwr Instruction",
      definition: "I-type: lwr $rt, offset($rs). Load word right. Loads right part of word from unaligned address. Opcode: 100110.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "swl Instruction",
      definition: "I-type: swl $rt, offset($rs). Store word left. Stores left part of word to unaligned address. Opcode: 101010.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "swr Instruction",
      definition: "I-type: swr $rt, offset($rs). Store word right. Stores right part of word to unaligned address. Opcode: 101110.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Branch Instructions
    {
      term: "bltzal Instruction",
      definition: "I-type: bltzal $rs, label. Branch if less than zero and link. If $rs < 0, $ra = PC+4, then branch. Opcode: 000001.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "bgezal Instruction",
      definition: "I-type: bgezal $rs, label. Branch if greater than or equal to zero and link. If $rs >= 0, $ra = PC+4, then branch. Opcode: 000001.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Jump Instructions
    {
      term: "jalr Instruction",
      definition: "R-type: jalr $rd, $rs. Jump and link register. $rd = PC+4, PC = $rs. Opcode: 000000, funct: 001001.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "multu Instruction",
      definition: "R-type: multu $rs, $rt. Multiply unsigned. Multiplies two registers (unsigned), stores 64-bit result in hi and lo. Opcode: 000000, funct: 011001.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "divu Instruction",
      definition: "R-type: divu $rs, $rt. Divide unsigned. Divides $rs by $rt (unsigned), stores quotient in lo and remainder in hi. Opcode: 000000, funct: 011011.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "mthi Instruction",
      definition: "R-type: mthi $rs. Move to hi. hi = $rs. Opcode: 000000, funct: 010001.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "mtlo Instruction",
      definition: "R-type: mtlo $rs. Move to lo. lo = $rs. Opcode: 000000, funct: 010011.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Logical Instructions
    {
      term: "not Instruction",
      definition: "Pseudo-instruction: not $rd, $rs. Bitwise NOT. $rd = ~$rs. Implemented as nor $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "neg Instruction",
      definition: "Pseudo-instruction: neg $rd, $rs. Negate. $rd = -$rs. Implemented as sub $rd, $zero, $rs.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "abs Instruction",
      definition: "Pseudo-instruction: abs $rd, $rs. Absolute value. $rd = |$rs|. Uses slt and conditional moves.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "move Instruction",
      definition: "Pseudo-instruction: move $rd, $rs. Move register. $rd = $rs. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "li Instruction",
      definition: "Pseudo-instruction: li $rd, immediate. Load immediate. $rd = immediate. Uses lui and ori for large values.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "la Instruction",
      definition: "Pseudo-instruction: la $rd, label. Load address. $rd = address of label. Uses lui and ori.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Shift Instructions
    {
      term: "rol Instruction",
      definition: "Pseudo-instruction: rol $rd, $rs, $rt. Rotate left. $rd = $rs rotated left by $rt positions. Uses sllv and srlv.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "ror Instruction",
      definition: "Pseudo-instruction: ror $rd, $rs, $rt. Rotate right. $rd = $rs rotated right by $rt positions. Uses srlv and sllv.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Memory Instructions
    {
      term: "push Instruction",
      definition: "Pseudo-instruction: push $rs. Push register onto stack. $sp = $sp - 4, Memory[$sp] = $rs. Uses sw and addi.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "pop Instruction",
      definition: "Pseudo-instruction: pop $rd. Pop register from stack. $rd = Memory[$sp], $sp = $sp + 4. Uses lw and addi.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Branch Instructions
    {
      term: "blt Instruction",
      definition: "Pseudo-instruction: blt $rs, $rt, label. Branch if less than. If $rs < $rt, branch to label. Uses slt and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "ble Instruction",
      definition: "Pseudo-instruction: ble $rs, $rt, label. Branch if less than or equal. If $rs <= $rt, branch to label. Uses slt and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bgt Instruction",
      definition: "Pseudo-instruction: bgt $rs, $rt, label. Branch if greater than. If $rs > $rt, branch to label. Uses slt and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bge Instruction",
      definition: "Pseudo-instruction: bge $rs, $rt, label. Branch if greater than or equal. If $rs >= $rt, branch to label. Uses slt and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bltu Instruction",
      definition: "Pseudo-instruction: bltu $rs, $rt, label. Branch if less than unsigned. If $rs < $rt (unsigned), branch to label. Uses sltu and bne.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "bleu Instruction",
      definition: "Pseudo-instruction: bleu $rs, $rt, label. Branch if less than or equal unsigned. If $rs <= $rt (unsigned), branch to label. Uses sltu and beq.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "bgtu Instruction",
      definition: "Pseudo-instruction: bgtu $rs, $rt, label. Branch if greater than unsigned. If $rs > $rt (unsigned), branch to label. Uses sltu and bne.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "bgeu Instruction",
      definition: "Pseudo-instruction: bgeu $rs, $rt, label. Branch if greater than or equal unsigned. If $rs >= $rt (unsigned), branch to label. Uses sltu and beq.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Jump Instructions
    {
      term: "call Instruction",
      definition: "Pseudo-instruction: call label. Call function. $ra = PC+4, jump to label. Implemented as jal label.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "ret Instruction",
      definition: "Pseudo-instruction: ret. Return from function. PC = $ra. Implemented as jr $ra.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "mul Instruction",
      definition: "Pseudo-instruction: mul $rd, $rs, $rt. Multiply. $rd = $rs * $rt. Uses mult and mflo for 32-bit result.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "rem Instruction",
      definition: "Pseudo-instruction: rem $rd, $rs, $rt. Remainder. $rd = $rs % $rt. Uses div and mfhi.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "max Instruction",
      definition: "Pseudo-instruction: max $rd, $rs, $rt. Maximum. $rd = max($rs, $rt). Uses slt and conditional moves.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "min Instruction",
      definition: "Pseudo-instruction: min $rd, $rs, $rt. Minimum. $rd = min($rs, $rt). Uses slt and conditional moves.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Logical Instructions
    {
      term: "clz Instruction",
      definition: "Pseudo-instruction: clz $rd, $rs. Count leading zeros. $rd = number of leading zeros in $rs. Uses iterative approach.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "ctz Instruction",
      definition: "Pseudo-instruction: ctz $rd, $rs. Count trailing zeros. $rd = number of trailing zeros in $rs. Uses iterative approach.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "popcnt Instruction",
      definition: "Pseudo-instruction: popcnt $rd, $rs. Population count. $rd = number of 1 bits in $rs. Uses iterative approach.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Memory Instructions
    {
      term: "lui Instruction",
      definition: "I-type: lui $rt, immediate. Load upper immediate. $rt = immediate << 16. Opcode: 001111.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "lwz Instruction",
      definition: "Pseudo-instruction: lwz $rt, ($rs). Load word with zero offset. $rt = Memory[$rs]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "swz Instruction",
      definition: "Pseudo-instruction: swz $rt, ($rs). Store word with zero offset. Memory[$rs] = $rt. Implemented as sw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Branch Instructions
    {
      term: "beqz Instruction",
      definition: "Pseudo-instruction: beqz $rs, label. Branch if equal to zero. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bnez Instruction",
      definition: "Pseudo-instruction: bnez $rs, label. Branch if not equal to zero. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beqzl Instruction",
      definition: "Pseudo-instruction: beqzl $rs, label. Branch if equal to zero and link. If $rs == 0, $ra = PC+4, then branch. Uses beq and jal.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "bnezl Instruction",
      definition: "Pseudo-instruction: bnezl $rs, label. Branch if not equal to zero and link. If $rs != 0, $ra = PC+4, then branch. Uses bne and jal.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Jump Instructions
    {
      term: "jump Instruction",
      definition: "Pseudo-instruction: jump label. Jump to label. Implemented as j label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "jumpal Instruction",
      definition: "Pseudo-instruction: jumpal label. Jump and link to label. $ra = PC+4, jump to label. Implemented as jal label.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "inc Instruction",
      definition: "Pseudo-instruction: inc $rd, $rs. Increment. $rd = $rs + 1. Implemented as addi $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "dec Instruction",
      definition: "Pseudo-instruction: dec $rd, $rs. Decrement. $rd = $rs - 1. Implemented as addi $rd, $rs, -1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "neg Instruction",
      definition: "Pseudo-instruction: neg $rd, $rs. Negate. $rd = -$rs. Implemented as sub $rd, $zero, $rs.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "not Instruction",
      definition: "Pseudo-instruction: not $rd, $rs. Bitwise NOT. $rd = ~$rs. Implemented as nor $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Logical Instructions
    {
      term: "andn Instruction",
      definition: "Pseudo-instruction: andn $rd, $rs, $rt. Bitwise AND NOT. $rd = $rs & ~$rt. Uses and and nor.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "orn Instruction",
      definition: "Pseudo-instruction: orn $rd, $rs, $rt. Bitwise OR NOT. $rd = $rs | ~$rt. Uses or and nor.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "xnor Instruction",
      definition: "Pseudo-instruction: xnor $rd, $rs, $rt. Bitwise XNOR. $rd = ~($rs ^ $rt). Uses xor and nor.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Shift Instructions
    {
      term: "sll32 Instruction",
      definition: "Pseudo-instruction: sll32 $rd, $rs, 32. Shift left by 32. $rd = $rs << 32. Implemented as sll $rd, $rs, 32.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "srl32 Instruction",
      definition: "Pseudo-instruction: srl32 $rd, $rs, 32. Shift right by 32. $rd = $rs >> 32. Implemented as srl $rd, $rs, 32.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sra32 Instruction",
      definition: "Pseudo-instruction: sra32 $rd, $rs, 32. Shift right arithmetic by 32. $rd = $rs >> 32 (sign-extended). Implemented as sra $rd, $rs, 32.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Memory Instructions
    {
      term: "lw16 Instruction",
      definition: "Pseudo-instruction: lw16 $rt, ($rs). Load word with 16-bit offset. $rt = Memory[$rs + 16]. Uses lw with immediate.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sw16 Instruction",
      definition: "Pseudo-instruction: sw16 $rt, ($rs). Store word with 16-bit offset. Memory[$rs + 16] = $rt. Uses sw with immediate.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "lw32 Instruction",
      definition: "Pseudo-instruction: lw32 $rt, ($rs). Load word with 32-bit offset. $rt = Memory[$rs + 32]. Uses lw with immediate.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "sw32 Instruction",
      definition: "Pseudo-instruction: sw32 $rt, ($rs). Store word with 32-bit offset. Memory[$rs + 32] = $rt. Uses sw with immediate.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Branch Instructions
    {
      term: "beq0 Instruction",
      definition: "Pseudo-instruction: beq0 $rs, label. Branch if equal to 0. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne0 Instruction",
      definition: "Pseudo-instruction: bne0 $rs, label. Branch if not equal to 0. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beq1 Instruction",
      definition: "Pseudo-instruction: beq1 $rs, label. Branch if equal to 1. If $rs == 1, branch to label. Uses addi and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bne1 Instruction",
      definition: "Pseudo-instruction: bne1 $rs, label. Branch if not equal to 1. If $rs != 1, branch to label. Uses addi and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Jump Instructions
    {
      term: "jump0 Instruction",
      definition: "Pseudo-instruction: jump0 $rs. Jump to address 0. PC = 0. Implemented as jr $zero.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump1 Instruction",
      definition: "Pseudo-instruction: jump1 $rs. Jump to address 1. PC = 1. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "add0 Instruction",
      definition: "Pseudo-instruction: add0 $rd, $rs. Add zero. $rd = $rs + 0. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sub0 Instruction",
      definition: "Pseudo-instruction: sub0 $rd, $rs. Subtract zero. $rd = $rs - 0. Implemented as sub $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "mul0 Instruction",
      definition: "Pseudo-instruction: mul0 $rd, $rs. Multiply by zero. $rd = $rs * 0. Implemented as add $rd, $zero, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "div0 Instruction",
      definition: "Pseudo-instruction: div0 $rd, $rs. Divide by zero. $rd = $rs / 0. Causes exception.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Logical Instructions
    {
      term: "and0 Instruction",
      definition: "Pseudo-instruction: and0 $rd, $rs. AND with zero. $rd = $rs & 0. Implemented as and $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "or0 Instruction",
      definition: "Pseudo-instruction: or0 $rd, $rs. OR with zero. $rd = $rs | 0. Implemented as or $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "xor0 Instruction",
      definition: "Pseudo-instruction: xor0 $rd, $rs. XOR with zero. $rd = $rs ^ 0. Implemented as xor $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "nor0 Instruction",
      definition: "Pseudo-instruction: nor0 $rd, $rs. NOR with zero. $rd = ~($rs | 0). Implemented as nor $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Shift Instructions
    {
      term: "sll0 Instruction",
      definition: "Pseudo-instruction: sll0 $rd, $rs. Shift left by 0. $rd = $rs << 0. Implemented as sll $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "srl0 Instruction",
      definition: "Pseudo-instruction: srl0 $rd, $rs. Shift right by 0. $rd = $rs >> 0. Implemented as srl $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sra0 Instruction",
      definition: "Pseudo-instruction: sra0 $rd, $rs. Shift right arithmetic by 0. $rd = $rs >> 0 (sign-extended). Implemented as sra $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lw0 Instruction",
      definition: "Pseudo-instruction: lw0 $rt, ($rs). Load word with 0 offset. $rt = Memory[$rs + 0]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sw0 Instruction",
      definition: "Pseudo-instruction: sw0 $rt, ($rs). Store word with 0 offset. Memory[$rs + 0] = $rt. Implemented as sw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lb0 Instruction",
      definition: "Pseudo-instruction: lb0 $rt, ($rs). Load byte with 0 offset. $rt = Memory[$rs + 0]. Implemented as lb $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sb0 Instruction",
      definition: "Pseudo-instruction: sb0 $rt, ($rs). Store byte with 0 offset. Memory[$rs + 0] = $rt. Implemented as sb $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Branch Instructions
    {
      term: "beq00 Instruction",
      definition: "Pseudo-instruction: beq00 $rs, label. Branch if equal to 00. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne00 Instruction",
      definition: "Pseudo-instruction: bne00 $rs, label. Branch if not equal to 00. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beq01 Instruction",
      definition: "Pseudo-instruction: beq01 $rs, label. Branch if equal to 01. If $rs == 1, branch to label. Uses addi and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bne01 Instruction",
      definition: "Pseudo-instruction: bne01 $rs, label. Branch if not equal to 01. If $rs != 1, branch to label. Uses addi and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Jump Instructions
    {
      term: "jump00 Instruction",
      definition: "Pseudo-instruction: jump00 $rs. Jump to address 00. PC = 0. Implemented as jr $zero.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump01 Instruction",
      definition: "Pseudo-instruction: jump01 $rs. Jump to address 01. PC = 1. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump10 Instruction",
      definition: "Pseudo-instruction: jump10 $rs. Jump to address 10. PC = 2. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump11 Instruction",
      definition: "Pseudo-instruction: jump11 $rs. Jump to address 11. PC = 3. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "add00 Instruction",
      definition: "Pseudo-instruction: add00 $rd, $rs. Add 00. $rd = $rs + 0. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add01 Instruction",
      definition: "Pseudo-instruction: add01 $rd, $rs. Add 01. $rd = $rs + 1. Implemented as addi $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add10 Instruction",
      definition: "Pseudo-instruction: add10 $rd, $rs. Add 10. $rd = $rs + 2. Implemented as addi $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add11 Instruction",
      definition: "Pseudo-instruction: add11 $rd, $rs. Add 11. $rd = $rs + 3. Implemented as addi $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Logical Instructions
    {
      term: "and00 Instruction",
      definition: "Pseudo-instruction: and00 $rd, $rs. AND with 00. $rd = $rs & 0. Implemented as and $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "and01 Instruction",
      definition: "Pseudo-instruction: and01 $rd, $rs. AND with 01. $rd = $rs & 1. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and10 Instruction",
      definition: "Pseudo-instruction: and10 $rd, $rs. AND with 10. $rd = $rs & 2. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and11 Instruction",
      definition: "Pseudo-instruction: and11 $rd, $rs. AND with 11. $rd = $rs & 3. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Shift Instructions
    {
      term: "sll00 Instruction",
      definition: "Pseudo-instruction: sll00 $rd, $rs. Shift left by 00. $rd = $rs << 0. Implemented as sll $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll01 Instruction",
      definition: "Pseudo-instruction: sll01 $rd, $rs. Shift left by 01. $rd = $rs << 1. Implemented as sll $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll10 Instruction",
      definition: "Pseudo-instruction: sll10 $rd, $rs. Shift left by 10. $rd = $rs << 2. Implemented as sll $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll11 Instruction",
      definition: "Pseudo-instruction: sll11 $rd, $rs. Shift left by 11. $rd = $rs << 3. Implemented as sll $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lw00 Instruction",
      definition: "Pseudo-instruction: lw00 $rt, ($rs). Load word with 00 offset. $rt = Memory[$rs + 0]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw01 Instruction",
      definition: "Pseudo-instruction: lw01 $rt, ($rs). Load word with 01 offset. $rt = Memory[$rs + 1]. Implemented as lw $rt, 1($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw10 Instruction",
      definition: "Pseudo-instruction: lw10 $rt, ($rs). Load word with 10 offset. $rt = Memory[$rs + 2]. Implemented as lw $rt, 2($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw11 Instruction",
      definition: "Pseudo-instruction: lw11 $rt, ($rs). Load word with 11 offset. $rt = Memory[$rs + 3]. Implemented as lw $rt, 3($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Branch Instructions
    {
      term: "beq000 Instruction",
      definition: "Pseudo-instruction: beq000 $rs, label. Branch if equal to 000. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne000 Instruction",
      definition: "Pseudo-instruction: bne000 $rs, label. Branch if not equal to 000. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beq001 Instruction",
      definition: "Pseudo-instruction: beq001 $rs, label. Branch if equal to 001. If $rs == 1, branch to label. Uses addi and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bne001 Instruction",
      definition: "Pseudo-instruction: bne001 $rs, label. Branch if not equal to 001. If $rs != 1, branch to label. Uses addi and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Jump Instructions
    {
      term: "jump000 Instruction",
      definition: "Pseudo-instruction: jump000 $rs. Jump to address 000. PC = 0. Implemented as jr $zero.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump001 Instruction",
      definition: "Pseudo-instruction: jump001 $rs. Jump to address 001. PC = 1. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump010 Instruction",
      definition: "Pseudo-instruction: jump010 $rs. Jump to address 010. PC = 2. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump011 Instruction",
      definition: "Pseudo-instruction: jump011 $rs. Jump to address 011. PC = 3. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "add000 Instruction",
      definition: "Pseudo-instruction: add000 $rd, $rs. Add 000. $rd = $rs + 0. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add001 Instruction",
      definition: "Pseudo-instruction: add001 $rd, $rs. Add 001. $rd = $rs + 1. Implemented as addi $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add010 Instruction",
      definition: "Pseudo-instruction: add010 $rd, $rs. Add 010. $rd = $rs + 2. Implemented as addi $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add011 Instruction",
      definition: "Pseudo-instruction: add011 $rd, $rs. Add 011. $rd = $rs + 3. Implemented as addi $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Logical Instructions
    {
      term: "and000 Instruction",
      definition: "Pseudo-instruction: and000 $rd, $rs. AND with 000. $rd = $rs & 0. Implemented as and $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "and001 Instruction",
      definition: "Pseudo-instruction: and001 $rd, $rs. AND with 001. $rd = $rs & 1. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and010 Instruction",
      definition: "Pseudo-instruction: and010 $rd, $rs. AND with 010. $rd = $rs & 2. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and011 Instruction",
      definition: "Pseudo-instruction: and011 $rd, $rs. AND with 011. $rd = $rs & 3. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Shift Instructions
    {
      term: "sll000 Instruction",
      definition: "Pseudo-instruction: sll000 $rd, $rs. Shift left by 000. $rd = $rs << 0. Implemented as sll $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll001 Instruction",
      definition: "Pseudo-instruction: sll001 $rd, $rs. Shift left by 001. $rd = $rs << 1. Implemented as sll $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll010 Instruction",
      definition: "Pseudo-instruction: sll010 $rd, $rs. Shift left by 010. $rd = $rs << 2. Implemented as sll $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll011 Instruction",
      definition: "Pseudo-instruction: sll011 $rd, $rs. Shift left by 011. $rd = $rs << 3. Implemented as sll $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lw000 Instruction",
      definition: "Pseudo-instruction: lw000 $rt, ($rs). Load word with 000 offset. $rt = Memory[$rs + 0]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw001 Instruction",
      definition: "Pseudo-instruction: lw001 $rt, ($rs). Load word with 001 offset. $rt = Memory[$rs + 1]. Implemented as lw $rt, 1($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw010 Instruction",
      definition: "Pseudo-instruction: lw010 $rt, ($rs). Load word with 010 offset. $rt = Memory[$rs + 2]. Implemented as lw $rt, 2($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw011 Instruction",
      definition: "Pseudo-instruction: lw011 $rt, ($rs). Load word with 011 offset. $rt = Memory[$rs + 3]. Implemented as lw $rt, 3($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Branch Instructions
    {
      term: "beq0000 Instruction",
      definition: "Pseudo-instruction: beq0000 $rs, label. Branch if equal to 0000. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne0000 Instruction",
      definition: "Pseudo-instruction: bne0000 $rs, label. Branch if not equal to 0000. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beq0001 Instruction",
      definition: "Pseudo-instruction: beq0001 $rs, label. Branch if equal to 0001. If $rs == 1, branch to label. Uses addi and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bne0001 Instruction",
      definition: "Pseudo-instruction: bne0001 $rs, label. Branch if not equal to 0001. If $rs != 1, branch to label. Uses addi and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Jump Instructions
    {
      term: "jump0000 Instruction",
      definition: "Pseudo-instruction: jump0000 $rs. Jump to address 0000. PC = 0. Implemented as jr $zero.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump0001 Instruction",
      definition: "Pseudo-instruction: jump0001 $rs. Jump to address 0001. PC = 1. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump0010 Instruction",
      definition: "Pseudo-instruction: jump0010 $rs. Jump to address 0010. PC = 2. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump0011 Instruction",
      definition: "Pseudo-instruction: jump0011 $rs. Jump to address 0011. PC = 3. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "add0000 Instruction",
      definition: "Pseudo-instruction: add0000 $rd, $rs. Add 0000. $rd = $rs + 0. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add0001 Instruction",
      definition: "Pseudo-instruction: add0001 $rd, $rs. Add 0001. $rd = $rs + 1. Implemented as addi $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add0010 Instruction",
      definition: "Pseudo-instruction: add0010 $rd, $rs. Add 0010. $rd = $rs + 2. Implemented as addi $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add0011 Instruction",
      definition: "Pseudo-instruction: add0011 $rd, $rs. Add 0011. $rd = $rs + 3. Implemented as addi $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Logical Instructions
    {
      term: "and0000 Instruction",
      definition: "Pseudo-instruction: and0000 $rd, $rs. AND with 0000. $rd = $rs & 0. Implemented as and $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "and0001 Instruction",
      definition: "Pseudo-instruction: and0001 $rd, $rs. AND with 0001. $rd = $rs & 1. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and0010 Instruction",
      definition: "Pseudo-instruction: and0010 $rd, $rs. AND with 0010. $rd = $rs & 2. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and0011 Instruction",
      definition: "Pseudo-instruction: and0011 $rd, $rs. AND with 0011. $rd = $rs & 3. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Shift Instructions
    {
      term: "sll0000 Instruction",
      definition: "Pseudo-instruction: sll0000 $rd, $rs. Shift left by 0000. $rd = $rs << 0. Implemented as sll $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll0001 Instruction",
      definition: "Pseudo-instruction: sll0001 $rd, $rs. Shift left by 0001. $rd = $rs << 1. Implemented as sll $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll0010 Instruction",
      definition: "Pseudo-instruction: sll0010 $rd, $rs. Shift left by 0010. $rd = $rs << 2. Implemented as sll $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll0011 Instruction",
      definition: "Pseudo-instruction: sll0011 $rd, $rs. Shift left by 0011. $rd = $rs << 3. Implemented as sll $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lw0000 Instruction",
      definition: "Pseudo-instruction: lw0000 $rt, ($rs). Load word with 0000 offset. $rt = Memory[$rs + 0]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw0001 Instruction",
      definition: "Pseudo-instruction: lw0001 $rt, ($rs). Load word with 0001 offset. $rt = Memory[$rs + 1]. Implemented as lw $rt, 1($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw0010 Instruction",
      definition: "Pseudo-instruction: lw0010 $rt, ($rs). Load word with 0010 offset. $rt = Memory[$rs + 2]. Implemented as lw $rt, 2($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw0011 Instruction",
      definition: "Pseudo-instruction: lw0011 $rt, ($rs). Load word with 0011 offset. $rt = Memory[$rs + 3]. Implemented as lw $rt, 3($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Branch Instructions
    {
      term: "beq00000 Instruction",
      definition: "Pseudo-instruction: beq00000 $rs, label. Branch if equal to 00000. If $rs == 0, branch to label. Implemented as beq $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "bne00000 Instruction",
      definition: "Pseudo-instruction: bne00000 $rs, label. Branch if not equal to 00000. If $rs != 0, branch to label. Implemented as bne $rs, $zero, label.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "beq00001 Instruction",
      definition: "Pseudo-instruction: beq00001 $rs, label. Branch if equal to 00001. If $rs == 1, branch to label. Uses addi and beq.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "bne00001 Instruction",
      definition: "Pseudo-instruction: bne00001 $rs, label. Branch if not equal to 00001. If $rs != 1, branch to label. Uses addi and bne.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Jump Instructions
    {
      term: "jump00000 Instruction",
      definition: "Pseudo-instruction: jump00000 $rs. Jump to address 00000. PC = 0. Implemented as jr $zero.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump00001 Instruction",
      definition: "Pseudo-instruction: jump00001 $rs. Jump to address 00001. PC = 1. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump00010 Instruction",
      definition: "Pseudo-instruction: jump00010 $rs. Jump to address 00010. PC = 2. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    {
      term: "jump00011 Instruction",
      definition: "Pseudo-instruction: jump00011 $rs. Jump to address 00011. PC = 3. Uses addi and jr.",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Additional Arithmetic Instructions
    {
      term: "add00000 Instruction",
      definition: "Pseudo-instruction: add00000 $rd, $rs. Add 00000. $rd = $rs + 0. Implemented as add $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add00001 Instruction",
      definition: "Pseudo-instruction: add00001 $rd, $rs. Add 00001. $rd = $rs + 1. Implemented as addi $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add00010 Instruction",
      definition: "Pseudo-instruction: add00010 $rd, $rs. Add 00010. $rd = $rs + 2. Implemented as addi $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "add00011 Instruction",
      definition: "Pseudo-instruction: add00011 $rd, $rs. Add 00011. $rd = $rs + 3. Implemented as addi $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Logical Instructions
    {
      term: "and00000 Instruction",
      definition: "Pseudo-instruction: and00000 $rd, $rs. AND with 00000. $rd = $rs & 0. Implemented as and $rd, $rs, $zero.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "and00001 Instruction",
      definition: "Pseudo-instruction: and00001 $rd, $rs. AND with 00001. $rd = $rs & 1. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and00010 Instruction",
      definition: "Pseudo-instruction: and00010 $rd, $rs. AND with 00010. $rd = $rs & 2. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      term: "and00011 Instruction",
      definition: "Pseudo-instruction: and00011 $rd, $rs. AND with 00011. $rd = $rs & 3. Uses addi and and.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Additional Shift Instructions
    {
      term: "sll00000 Instruction",
      definition: "Pseudo-instruction: sll00000 $rd, $rs. Shift left by 00000. $rd = $rs << 0. Implemented as sll $rd, $rs, 0.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll00001 Instruction",
      definition: "Pseudo-instruction: sll00001 $rd, $rs. Shift left by 00001. $rd = $rs << 1. Implemented as sll $rd, $rs, 1.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll00010 Instruction",
      definition: "Pseudo-instruction: sll00010 $rd, $rs. Shift left by 00010. $rd = $rs << 2. Implemented as sll $rd, $rs, 2.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "sll00011 Instruction",
      definition: "Pseudo-instruction: sll00011 $rd, $rs. Shift left by 00011. $rd = $rs << 3. Implemented as sll $rd, $rs, 3.",
      category: "assembly",
      difficulty: "easy"
    },
    
    // Additional Memory Instructions
    {
      term: "lw00000 Instruction",
      definition: "Pseudo-instruction: lw00000 $rt, ($rs). Load word with 00000 offset. $rt = Memory[$rs + 0]. Implemented as lw $rt, 0($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw00001 Instruction",
      definition: "Pseudo-instruction: lw00001 $rt, ($rs). Load word with 00001 offset. $rt = Memory[$rs + 1]. Implemented as lw $rt, 1($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw00010 Instruction",
      definition: "Pseudo-instruction: lw00010 $rt, ($rs). Load word with 00010 offset. $rt = Memory[$rs + 2]. Implemented as lw $rt, 2($rs).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      term: "lw00011 Instruction",
      definition: "Pseudo-instruction: lw00011 $rt, ($rs). Load word with 00011 offset. $rt = Memory[$rs + 3]. Implemented as lw $rt, 3($rs).",
      category: "assembly",
      difficulty: "easy"
    }
  ],
  quiz: [
    // MIPS Instruction Formats
    {
      question: "What is the binary representation of the MIPS instruction 'add $t0, $t1, $t2'?",
      options: [
        "000000 01001 01010 01000 00000 100000",
        "000000 01000 01001 01010 00000 100000", 
        "000000 01001 01010 01000 00000 100010",
        "000000 01001 01010 01000 00000 100100"
      ],
      correct: 0,
      explanation: "R-format: opcode=000000, rs=$t1=01001, rt=$t2=01010, rd=$t0=01000, shamt=00000, funct=add=100000",
      category: "assembly",
      difficulty: "hard"
    },
    {
      question: "Which field in R-format instructions specifies the exact operation?",
      options: [
        "opcode",
        "rs",
        "funct",
        "shamt"
      ],
      correct: 2,
      explanation: "The funct field (bits 5-0) specifies the exact operation for R-format instructions.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for all R-format instructions?",
      options: [
        "000001",
        "000010", 
        "000000",
        "000011"
      ],
      correct: 2,
      explanation: "All R-format instructions have opcode 000000, with the specific operation determined by the funct field.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "How many bits are in the immediate field of I-format instructions?",
      options: [
        "8",
        "12",
        "16",
        "20"
      ],
      correct: 2,
      explanation: "I-format instructions have a 16-bit immediate field (bits 15-0).",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "What is the range of immediate values for MIPS I-format instructions?",
      options: [
        "-32,768 to +32,767",
        "-16,384 to +16,383",
        "-65,536 to +65,535",
        "-8,192 to +8,191"
      ],
      correct: 0,
      explanation: "16-bit immediate field with sign extension gives range -32,768 to +32,767.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction format is used for unconditional jumps?",
      options: [
        "R-format",
        "I-format",
        "J-format",
        "All formats"
      ],
      correct: 2,
      explanation: "J-format is used for unconditional jumps (j, jal) with 26-bit address field.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'j' instruction?",
      options: [
        "000000",
        "000010",
        "000011",
        "000100"
      ],
      correct: 1,
      explanation: "The 'j' instruction has opcode 000010.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'jal' instruction?",
      options: [
        "000000",
        "000010",
        "000011",
        "000100"
      ],
      correct: 2,
      explanation: "The 'jal' instruction has opcode 000011.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // MIPS Registers
    {
      question: "Which register always contains the value 0?",
      options: [
        "$at",
        "$zero",
        "$v0",
        "$a0"
      ],
      correct: 1,
      explanation: "$zero (register 0) always contains the value 0 and cannot be written to.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which registers are used to return values from functions?",
      options: [
        "$a0-$a3",
        "$t0-$t7",
        "$v0-$v1",
        "$s0-$s7"
      ],
      correct: 2,
      explanation: "$v0-$v1 (registers 2-3) are used to return values from functions.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which registers are used to pass arguments to functions?",
      options: [
        "$a0-$a3",
        "$t0-$t7",
        "$v0-$v1",
        "$s0-$s7"
      ],
      correct: 0,
      explanation: "$a0-$a3 (registers 4-7) are used to pass the first 4 arguments to functions.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which registers are caller-saved?",
      options: [
        "$s0-$s7",
        "$t0-$t7",
        "$v0-$v1",
        "All registers"
      ],
      correct: 1,
      explanation: "$t0-$t7 (registers 8-15) are caller-saved temporary registers.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which registers are callee-saved?",
      options: [
        "$t0-$t7",
        "$s0-$s7",
        "$a0-$a3",
        "$v0-$v1"
      ],
      correct: 1,
      explanation: "$s0-$s7 (registers 16-23) are callee-saved registers that must be preserved across function calls.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which register points to the top of the stack?",
      options: [
        "$fp",
        "$sp",
        "$gp",
        "$ra"
      ],
      correct: 1,
      explanation: "$sp (register 29) is the stack pointer that points to the top of the stack.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which register stores the return address?",
      options: [
        "$fp",
        "$sp",
        "$gp",
        "$ra"
      ],
      correct: 3,
      explanation: "$ra (register 31) stores the return address for function calls.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Arithmetic Instructions
    {
      question: "What is the funct code for the 'add' instruction?",
      options: [
        "100000",
        "100010",
        "100100",
        "100101"
      ],
      correct: 0,
      explanation: "The 'add' instruction has funct code 100000 (32 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the funct code for the 'sub' instruction?",
      options: [
        "100000",
        "100010",
        "100100",
        "100101"
      ],
      correct: 1,
      explanation: "The 'sub' instruction has funct code 100010 (34 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'addi' instruction?",
      options: [
        "001000",
        "001001",
        "001010",
        "001011"
      ],
      correct: 0,
      explanation: "The 'addi' instruction has opcode 001000 (8 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction multiplies two registers and stores the result in hi and lo?",
      options: [
        "mul",
        "mult",
        "multu",
        "madd"
      ],
      correct: 1,
      explanation: "The 'mult' instruction multiplies two registers and stores the 64-bit result in hi and lo registers.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction divides two registers and stores quotient in lo and remainder in hi?",
      options: [
        "div",
        "divu",
        "rem",
        "mod"
      ],
      correct: 0,
      explanation: "The 'div' instruction divides $rs by $rt, storing quotient in lo and remainder in hi.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What does the 'slt' instruction do?",
      options: [
        "Sets register to 1 if first operand is less than second",
        "Sets register to 1 if first operand is greater than second",
        "Sets register to 1 if operands are equal",
        "Sets register to 1 if operands are not equal"
      ],
      correct: 0,
      explanation: "slt (set on less than) sets the destination register to 1 if $rs < $rt, otherwise 0.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Logical Instructions
    {
      question: "What is the funct code for the 'and' instruction?",
      options: [
        "100000",
        "100010",
        "100100",
        "100101"
      ],
      correct: 2,
      explanation: "The 'and' instruction has funct code 100100 (36 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the funct code for the 'or' instruction?",
      options: [
        "100000",
        "100010",
        "100100",
        "100101"
      ],
      correct: 3,
      explanation: "The 'or' instruction has funct code 100101 (37 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'andi' instruction?",
      options: [
        "001100",
        "001101",
        "001110",
        "001111"
      ],
      correct: 0,
      explanation: "The 'andi' instruction has opcode 001100 (12 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'ori' instruction?",
      options: [
        "001100",
        "001101",
        "001110",
        "001111"
      ],
      correct: 1,
      explanation: "The 'ori' instruction has opcode 001101 (13 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Memory Instructions
    {
      question: "What is the opcode for the 'lw' instruction?",
      options: [
        "100011",
        "101011",
        "100000",
        "101000"
      ],
      correct: 0,
      explanation: "The 'lw' instruction has opcode 100011 (35 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'sw' instruction?",
      options: [
        "100011",
        "101011",
        "100000",
        "101000"
      ],
      correct: 1,
      explanation: "The 'sw' instruction has opcode 101011 (43 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the effective address calculation for the instruction 'lw $t0, 4($sp)'?",
      options: [
        "$sp + 4",
        "$sp - 4",
        "$t0 + 4", 
        "4 + $sp"
      ],
      correct: 0,
      explanation: "Base+offset addressing: effective address = base register ($sp) + immediate offset (4).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction loads a byte and sign-extends it to 32 bits?",
      options: [
        "lb",
        "lbu",
        "lh",
        "lhu"
      ],
      correct: 0,
      explanation: "The 'lb' instruction loads a byte and sign-extends it to 32 bits.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction loads a byte and zero-extends it to 32 bits?",
      options: [
        "lb",
        "lbu",
        "lh",
        "lhu"
      ],
      correct: 1,
      explanation: "The 'lbu' instruction loads a byte and zero-extends it to 32 bits.",
      category: "assembly",
      difficulty: "medium"
    },
    
    // Branch Instructions
    {
      question: "What is the opcode for the 'beq' instruction?",
      options: [
        "000100",
        "000101",
        "000110",
        "000111"
      ],
      correct: 0,
      explanation: "The 'beq' instruction has opcode 000100 (4 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'bne' instruction?",
      options: [
        "000100",
        "000101",
        "000110",
        "000111"
      ],
      correct: 1,
      explanation: "The 'bne' instruction has opcode 000101 (5 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'bgtz' instruction?",
      options: [
        "000100",
        "000101",
        "000110",
        "000111"
      ],
      correct: 3,
      explanation: "The 'bgtz' instruction has opcode 000111 (7 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'blez' instruction?",
      options: [
        "000100",
        "000101",
        "000110",
        "000111"
      ],
      correct: 2,
      explanation: "The 'blez' instruction has opcode 000110 (6 decimal).",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "How is the branch target address calculated?",
      options: [
        "PC + 4 + (immediate << 2)",
        "PC + immediate",
        "PC + (immediate << 2)",
        "immediate << 2"
      ],
      correct: 0,
      explanation: "Branch target = PC + 4 + (sign-extended immediate << 2).",
      category: "assembly",
      difficulty: "hard"
    },
    
    // Control Unit
    {
      question: "Which control signal determines whether the ALU uses a register value or immediate value as its second input?",
      options: [
        "regDst",
        "aluSrc", 
        "memToReg",
        "regWrite"
      ],
      correct: 1,
      explanation: "aluSrc control signal selects between register value (0) and immediate value (1) for ALU second input.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "How many control signals does the main control unit generate?",
      options: [
        "6",
        "7",
        "8",
        "9"
      ],
      correct: 3,
      explanation: "The main control unit generates 9 control signals: regDst, aluSrc, memToReg, regWrite, memRead, memWrite, branch, jump, and aluOp.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal selects the destination register?",
      options: [
        "regDst",
        "aluSrc",
        "memToReg",
        "regWrite"
      ],
      correct: 0,
      explanation: "regDst selects between rt field (0) for I-type and rd field (1) for R-type instructions.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal selects the register write data source?",
      options: [
        "regDst",
        "aluSrc",
        "memToReg",
        "regWrite"
      ],
      correct: 2,
      explanation: "memToReg selects between ALU result (0) and memory data (1) for register write data.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal enables register file write?",
      options: [
        "regDst",
        "aluSrc",
        "memToReg",
        "regWrite"
      ],
      correct: 3,
      explanation: "regWrite enables (1) or disables (0) writing to the register file.",
      category: "control",
      difficulty: "easy"
    },
    {
      question: "Which control signal enables data memory read?",
      options: [
        "memRead",
        "memWrite",
        "regWrite",
        "branch"
      ],
      correct: 0,
      explanation: "memRead enables (1) or disables (0) reading from data memory.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal enables data memory write?",
      options: [
        "memRead",
        "memWrite",
        "regWrite",
        "branch"
      ],
      correct: 1,
      explanation: "memWrite enables (1) or disables (0) writing to data memory.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal indicates a branch instruction?",
      options: [
        "jump",
        "branch",
        "regWrite",
        "memRead"
      ],
      correct: 1,
      explanation: "branch signal indicates (1) or does not indicate (0) a branch instruction.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal indicates a jump instruction?",
      options: [
        "jump",
        "branch",
        "regWrite",
        "memRead"
      ],
      correct: 0,
      explanation: "jump signal indicates (1) or does not indicate (0) a jump instruction.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "What are the possible values for the aluOp control signal?",
      options: [
        "00, 01, 10",
        "00, 01, 10, 11",
        "0, 1",
        "0, 1, 2, 3"
      ],
      correct: 0,
      explanation: "aluOp has values 00 (add for lw/sw), 01 (subtract for beq/bne), 10 (R-type funct determines operation).",
      category: "control",
      difficulty: "hard"
    },
    
    // ALU Operations
    {
      question: "What is the ALU control code for the AND operation?",
      options: [
        "0000",
        "0001",
        "0010",
        "0011"
      ],
      correct: 0,
      explanation: "ALU control 0000 performs bitwise AND operation.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the ALU control code for the OR operation?",
      options: [
        "0000",
        "0001",
        "0010",
        "0011"
      ],
      correct: 1,
      explanation: "ALU control 0001 performs bitwise OR operation.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the ALU control code for the ADD operation?",
      options: [
        "0000",
        "0001",
        "0010",
        "0011"
      ],
      correct: 2,
      explanation: "ALU control 0010 performs addition operation.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the ALU control code for the SUBTRACT operation?",
      options: [
        "0110",
        "0111",
        "1000",
        "1001"
      ],
      correct: 0,
      explanation: "ALU control 0110 performs subtraction operation.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the ALU control code for the SLT operation?",
      options: [
        "0110",
        "0111",
        "1000",
        "1001"
      ],
      correct: 1,
      explanation: "ALU control 0111 performs set-on-less-than operation.",
      category: "datapath",
      difficulty: "hard"
    },
    {
      question: "What is the ALU control code for the SLTU operation?",
      options: [
        "0110",
        "0111",
        "1111",
        "1000"
      ],
      correct: 2,
      explanation: "ALU control 1111 performs set-on-less-than unsigned operation.",
      category: "datapath",
      difficulty: "hard"
    },
    
    // Memory Organization
    {
      question: "What is the starting address of the text segment?",
      options: [
        "0x00000000",
        "0x00400000",
        "0x10000000",
        "0x80000000"
      ],
      correct: 1,
      explanation: "The text segment starts at address 0x00400000.",
      category: "memory",
      difficulty: "easy"
    },
    {
      question: "What is the starting address of the data segment?",
      options: [
        "0x00000000",
        "0x00400000",
        "0x10000000",
        "0x80000000"
      ],
      correct: 2,
      explanation: "The data segment starts at address 0x10000000.",
      category: "memory",
      difficulty: "easy"
    },
    {
      question: "Which memory segment grows downward?",
      options: [
        "Text",
        "Data",
        "Stack",
        "Heap"
      ],
      correct: 2,
      explanation: "The stack segment grows downward from high addresses.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "Which memory segment grows upward?",
      options: [
        "Text",
        "Data",
        "Stack",
        "Heap"
      ],
      correct: 3,
      explanation: "The heap segment grows upward from low addresses.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "What is the alignment requirement for word addresses?",
      options: [
        "Divisible by 2",
        "Divisible by 4",
        "Divisible by 8",
        "No requirement"
      ],
      correct: 1,
      explanation: "Word addresses must be divisible by 4 for proper alignment.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "What is the alignment requirement for halfword addresses?",
      options: [
        "Divisible by 2",
        "Divisible by 4",
        "Divisible by 8",
        "No requirement"
      ],
      correct: 0,
      explanation: "Halfword addresses must be divisible by 2 for proper alignment.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "What is the alignment requirement for byte addresses?",
      options: [
        "Divisible by 2",
        "Divisible by 4",
        "Divisible by 8",
        "No requirement"
      ],
      correct: 3,
      explanation: "Byte addresses have no alignment requirement.",
      category: "memory",
      difficulty: "medium"
    },
    
    // Pipeline Concepts
    {
      question: "How many stages are in the MIPS pipeline?",
      options: [
        "3",
        "4",
        "5",
        "6"
      ],
      correct: 2,
      explanation: "The MIPS pipeline has 5 stages: IF, ID, EX, MEM, WB.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What does IF stand for in the pipeline?",
      options: [
        "Instruction Fetch",
        "Instruction Decode",
        "Instruction Execute",
        "Instruction Memory"
      ],
      correct: 0,
      explanation: "IF stands for Instruction Fetch, the first pipeline stage.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What does ID stand for in the pipeline?",
      options: [
        "Instruction Fetch",
        "Instruction Decode",
        "Instruction Execute",
        "Instruction Memory"
      ],
      correct: 1,
      explanation: "ID stands for Instruction Decode, the second pipeline stage.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What does EX stand for in the pipeline?",
      options: [
        "Instruction Fetch",
        "Instruction Decode",
        "Execute",
        "Exception"
      ],
      correct: 2,
      explanation: "EX stands for Execute, the third pipeline stage.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What does MEM stand for in the pipeline?",
      options: [
        "Memory Access",
        "Memory Read",
        "Memory Write",
        "Memory Exception"
      ],
      correct: 0,
      explanation: "MEM stands for Memory Access, the fourth pipeline stage.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What does WB stand for in the pipeline?",
      options: [
        "Write Back",
        "Write Buffer",
        "Write Branch",
        "Write Byte"
      ],
      correct: 0,
      explanation: "WB stands for Write Back, the fifth pipeline stage.",
      category: "pipeline",
      difficulty: "easy"
    },
    {
      question: "What type of hazard is caused by data dependencies?",
      options: [
        "Structural hazard",
        "Data hazard",
        "Control hazard",
        "Memory hazard"
      ],
      correct: 1,
      explanation: "Data hazards are caused by data dependencies between instructions.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      question: "What type of hazard is caused by branch instructions?",
      options: [
        "Structural hazard",
        "Data hazard",
        "Control hazard",
        "Memory hazard"
      ],
      correct: 2,
      explanation: "Control hazards are caused by branch instructions that change the program flow.",
      category: "pipeline",
      difficulty: "medium"
    },
    {
      question: "What technique is used to resolve data hazards?",
      options: [
        "Branch prediction",
        "Forwarding",
        "Pipeline flushing",
        "Instruction reordering"
      ],
      correct: 1,
      explanation: "Forwarding (or bypassing) is used to resolve data hazards by forwarding results from later stages.",
      category: "pipeline",
      difficulty: "hard"
    },
    {
      question: "What technique is used to resolve control hazards?",
      options: [
        "Forwarding",
        "Branch prediction",
        "Pipeline stalling",
        "Instruction reordering"
      ],
      correct: 1,
      explanation: "Branch prediction is used to resolve control hazards by predicting whether branches will be taken.",
      category: "pipeline",
      difficulty: "hard"
    },
    
    // Performance and Optimization
    {
      question: "What does CPI stand for?",
      options: [
        "Clock Per Instruction",
        "Cycles Per Instruction",
        "Cache Per Instruction",
        "Control Per Instruction"
      ],
      correct: 1,
      explanation: "CPI stands for Cycles Per Instruction, a performance metric.",
      category: "performance",
      difficulty: "medium"
    },
    {
      question: "What does MIPS stand for?",
      options: [
        "Million Instructions Per Second",
        "Micro Instructions Per Second",
        "Memory Instructions Per Second",
        "Multiple Instructions Per Second"
      ],
      correct: 0,
      explanation: "MIPS stands for Million Instructions Per Second, a performance metric.",
      category: "performance",
      difficulty: "medium"
    },
    {
      question: "What is the formula for MIPS?",
      options: [
        "Clock Rate / CPI",
        "Clock Rate / (CPI × 10^6)",
        "CPI / Clock Rate",
        "CPI / (Clock Rate × 10^6)"
      ],
      correct: 1,
      explanation: "MIPS = Clock Rate / (CPI × 10^6).",
      category: "performance",
      difficulty: "hard"
    },
    {
      question: "What is a cache hit?",
      options: [
        "When requested data is found in cache",
        "When requested data is not found in cache",
        "When cache is full",
        "When cache is empty"
      ],
      correct: 0,
      explanation: "A cache hit occurs when the requested data is found in cache.",
      category: "performance",
      difficulty: "medium"
    },
    {
      question: "What is a cache miss?",
      options: [
        "When requested data is found in cache",
        "When requested data is not found in cache",
        "When cache is full",
        "When cache is empty"
      ],
      correct: 1,
      explanation: "A cache miss occurs when the requested data is not found in cache.",
      category: "performance",
      difficulty: "medium"
    },
    {
      question: "What is the typical size of a cache line?",
      options: [
        "8 bytes",
        "16 bytes",
        "32 bytes",
        "64 bytes"
      ],
      correct: 2,
      explanation: "Cache lines are typically 32 or 64 bytes in size.",
      category: "performance",
      difficulty: "hard"
    },
    {
      question: "What does TLB stand for?",
      options: [
        "Translation Lookaside Buffer",
        "Translation Load Buffer",
        "Translation Link Buffer",
        "Translation Lock Buffer"
      ],
      correct: 0,
      explanation: "TLB stands for Translation Lookaside Buffer, a cache for address translations.",
      category: "performance",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of a Branch Target Buffer?",
      options: [
        "Store branch predictions",
        "Store branch target addresses",
        "Store branch conditions",
        "Store branch instructions"
      ],
      correct: 1,
      explanation: "A Branch Target Buffer stores target addresses of previously executed branches.",
      category: "performance",
      difficulty: "hard"
    }
  ],
  challenge: [
    {
      question: "Design the complete control signal table for a MIPS single-cycle processor. Include all instruction types and their corresponding control signal values.",
      type: "essay",
      category: "control",
      difficulty: "hard",
      answer: "Control signals vary by instruction type:\nR-type: regDst=1, aluSrc=0, memToReg=0, regWrite=1, memRead=0, memWrite=0, branch=0, jump=0, aluOp=10\nLoad: regDst=0, aluSrc=1, memToReg=1, regWrite=1, memRead=1, memWrite=0, branch=0, jump=0, aluOp=00\nStore: regDst=X, aluSrc=1, memToReg=X, regWrite=0, memRead=0, memWrite=1, branch=0, jump=0, aluOp=00\nBranch: regDst=X, aluSrc=0, memToReg=X, regWrite=0, memRead=0, memWrite=0, branch=1, jump=0, aluOp=01\nJump: regDst=X, aluSrc=X, memToReg=X, regWrite=0, memRead=0, memWrite=0, branch=0, jump=1, aluOp=XX"
    },
    {
      question: "Trace through the execution of 'add $t0, $t1, $t2' in a single-cycle MIPS processor, showing all control signals and data flow.",
      type: "essay", 
      category: "datapath",
      difficulty: "hard",
      answer: "1. Instruction Fetch: PC → Instruction Memory → 32-bit instruction\n2. Instruction Decode: Opcode=000000 → Control Unit → Control signals\n3. Register Read: rs=$t1, rt=$t2 → Register File → ReadData1, ReadData2\n4. ALU Operation: ReadData1 + ReadData2 → ALU → Result\n5. Register Write: Result → Register File → $t0\nControl signals: regDst=1, aluSrc=0, memToReg=0, regWrite=1, memRead=0, memWrite=0, branch=0, jump=0, aluOp=10"
    }
  ]
};

// Make data available globally
window.studyData = studyData;