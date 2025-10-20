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
  review: {
    title: "Computer Architecture 351 - Comprehensive Review",
    description: "Complete educational review covering all pre-midterm topics with layman explanations and technical definitions",
    sections: [
      {
        id: "fundamentals",
        title: "1. Computer Architecture Fundamentals",
        description: "Building blocks and basic concepts that form the foundation of computer systems",
        topics: [
          {
            term: "Computer Architecture",
            layDefinition: "The overall design and organization of a computer system - like the blueprint of a house that shows how all the rooms connect and work together.",
            technicalDefinition: "The conceptual design and fundamental operational structure of a computer system, encompassing the instruction set architecture (ISA), microarchitecture, and system design.",
            keyConcepts: [
              "Instruction Set Architecture (ISA) - the interface between hardware and software",
              "Microarchitecture - the implementation of the ISA",
              "System design - how components interact"
            ],
            examples: [
              {
                name: "MIPS ISA Example",
                description: "MIPS R3000 ISA with 32 registers, load/store architecture, and fixed-length 32-bit instructions"
              },
              {
                name: "Implementation Comparison",
                description: "Single-cycle: 1 instruction per 5 cycles; Multi-cycle: 1 instruction per 3-5 cycles; Pipelined: 1 instruction per cycle"
              },
              {
                name: "Memory Hierarchy",
                description: "Registers (1 cycle) → L1 Cache (1-10 cycles) → L2 Cache (10-50 cycles) → Main Memory (100+ cycles) → Disk (millions of cycles)"
              }
            ],
            testPoints: [
              "Difference between ISA and microarchitecture",
              "Role of abstraction in computer design",
              "Performance vs cost tradeoffs"
            ]
          },
          {
            term: "Instruction Set Architecture (ISA)",
            layDefinition: "The 'language' that the computer's brain understands - like the grammar rules for how to give commands to a computer.",
            technicalDefinition: "The interface between the hardware and software layers, defining the instruction set, data types, registers, memory addressing modes, and exception handling mechanisms.",
            keyConcepts: [
              "Instruction formats (R-type, I-type, J-type)",
              "Register set and addressing modes",
              "Memory organization and addressing",
              "Exception and interrupt handling"
            ],
            examples: [
              "MIPS R3000 ISA with 32 registers",
              "Load/store architecture",
              "Fixed-length 32-bit instructions"
            ],
            testPoints: [
              "RISC vs CISC design philosophies",
              "Register vs memory operations",
              "Instruction encoding efficiency"
            ]
          },
          {
            term: "Microarchitecture",
            layDefinition: "The actual 'wiring' and 'plumbing' inside the computer that makes the instructions work - like the pipes and electrical systems in a building.",
            technicalDefinition: "The implementation of the ISA at the hardware level, including the datapath, control unit, and timing mechanisms.",
            keyConcepts: [
              "Datapath design and control signals",
              "Single-cycle vs multi-cycle implementation",
              "Pipeline stages and hazards",
              "Cache and memory hierarchy"
            ],
            examples: [
              "MIPS single-cycle datapath",
              "5-stage pipeline implementation",
              "Branch prediction mechanisms"
            ],
            testPoints: [
              "Control signal generation",
              "Data hazards and forwarding",
              "Cache hit/miss analysis"
            ]
          }
        ]
      },
      {
        id: "mips_instructions",
        title: "2. MIPS Instruction Set Architecture",
        description: "Complete coverage of MIPS instruction formats and operations",
        topics: [
          {
            term: "R-Format Instructions",
            layDefinition: "Instructions that work with three numbers already stored in the computer's fast memory (registers) - like a calculator that uses three numbers you've already entered.",
            technicalDefinition: "32-bit instruction format with 6-bit opcode (000000), 5-bit rs (source register 1), 5-bit rt (source register 2), 5-bit rd (destination register), 5-bit shamt (shift amount), and 6-bit funct (function code). Used for register-to-register operations.",
            binaryFormat: "000000 | rs(5) | rt(5) | rd(5) | shamt(5) | funct(6)",
            examples: [
              {
                instruction: "add $t0, $t1, $t2",
                binary: "000000 01001 01010 01000 00000 100000",
                explanation: "Add contents of $t1 and $t2, store result in $t0"
              },
              {
                instruction: "sub $s0, $s1, $s2", 
                binary: "000000 10001 10010 10000 00000 100010",
                explanation: "Subtract $s2 from $s1, store result in $s0"
              },
              {
                instruction: "sll $t0, $t1, 2",
                binary: "000000 00000 01001 01000 00010 000000",
                explanation: "Shift $t1 left by 2 positions, store in $t0"
              }
            ],
            keyPoints: [
              "Always have opcode 000000 (identifies as R-type)",
              "Three register operands: rs, rt, rd",
              "funct field determines the specific operation",
              "shamt field used for shift operations"
            ],
            testPoints: [
              "Binary encoding of R-type instructions",
              "Register number to binary conversion",
              "Function code identification"
            ]
          },
          {
            term: "I-Format Instructions",
            layDefinition: "Instructions that work with one number from fast memory and one constant number, or for loading/storing data from/to slower memory - like a calculator that uses one stored number and one number you type in.",
            technicalDefinition: "32-bit instruction format with 6-bit opcode, 5-bit rs (source register), 5-bit rt (destination register), and 16-bit immediate (constant value). Used for arithmetic with constants, memory operations, and conditional branches.",
            binaryFormat: "opcode(6) | rs(5) | rt(5) | immediate(16)",
            examples: [
              {
                instruction: "addi $t0, $t1, 100",
                binary: "001000 01001 01000 0000000001100100",
                explanation: "Add 100 to contents of $t1, store in $t0"
              },
              {
                instruction: "lw $t0, 8($sp)",
                binary: "100011 11101 01000 0000000000001000",
                explanation: "Load word from memory address ($sp + 8) into $t0"
              },
              {
                instruction: "beq $t0, $t1, loop",
                binary: "000100 01000 01001 0000000000000100",
                explanation: "Branch to 'loop' if $t0 equals $t1"
              }
            ],
            signExtension: {
              concept: "16-bit immediate values are sign-extended to 32 bits",
              positive: "100 = 0000000001100100 → 00000000000000000000000001100100",
              negative: "-100 = 1111111110011100 → 11111111111111111111111110011100",
              range: "Immediate values: -32,768 to +32,767"
            },
            keyPoints: [
              "Variable opcode identifies instruction type",
              "16-bit immediate field for constants",
              "Sign extension for negative values",
              "Used for memory access and branches"
            ],
            testPoints: [
              "Sign extension process",
              "Memory addressing calculations",
              "Branch target address computation"
            ]
          },
          {
            term: "J-Format Instructions",
            layDefinition: "Instructions that make the program jump to a completely different location - like skipping to a different chapter in a book.",
            technicalDefinition: "32-bit instruction format with 6-bit opcode (000010 for j, 000011 for jal) and 26-bit address field. Used for unconditional jumps and function calls.",
            binaryFormat: "opcode(6) | address(26)",
            examples: [
              {
                instruction: "j main",
                binary: "000010 followed by 26-bit address",
                explanation: "Jump unconditionally to 'main' label"
              },
              {
                instruction: "jal function",
                binary: "000011 followed by 26-bit address", 
                explanation: "Jump to 'function' and save return address in $ra"
              }
            ],
            addressCalculation: {
              process: "26-bit address shifted left 2 bits, combined with upper 4 bits of PC+4",
              formula: "Jump Address = (PC+4)[31:28] || (address << 2)",
              example: "PC+4 = 0x00400020, address = 0x0000000A → jump address = 0x00400028"
            },
            keyPoints: [
              "Only 2 bits of opcode needed (000010, 000011)",
              "26-bit address field (shifted left 2 bits)",
              "Combined with upper 4 bits of PC+4",
              "Used for jumps and function calls"
            ],
            testPoints: [
              "Jump address calculation",
              "PC-relative vs absolute addressing",
              "Function call mechanism"
            ]
          },
          {
            term: "MIPS Register Set",
            layDefinition: "The computer's fast storage slots, each with a specific purpose - like numbered drawers in a desk where you store different types of items.",
            technicalDefinition: "32 general-purpose registers (32-bit each) with specific naming conventions and usage patterns, plus special registers like PC, HI, LO.",
            registerMap: {
              "$zero": "00000 - Always contains 0, cannot be written to",
              "$at": "00001 - Assembler temporary, used by assembler",
              "$v0-$v1": "00010-00011 - Return values from functions",
              "$a0-$a3": "00100-00111 - Arguments to functions",
              "$t0-$t7": "01000-01111 - Temporary registers (caller-saved)",
              "$s0-$s7": "10000-10111 - Saved registers (callee-saved)",
              "$t8-$t9": "11000-11001 - Additional temporary registers",
              "$k0-$k1": "11010-11011 - Kernel registers (OS use)",
              "$gp": "11100 - Global pointer",
              "$sp": "11101 - Stack pointer",
              "$fp": "11110 - Frame pointer", 
              "$ra": "11111 - Return address"
            },
            conventions: [
              "Caller-saved: $t0-$t9, $a0-$a3, $v0-$v1 (caller must save)",
              "Callee-saved: $s0-$s7, $sp, $fp, $ra (callee must save)",
              "Special purpose: $zero, $at, $gp, $k0-$k1"
            ],
            keyPoints: [
              "32 registers total (0-31)",
              "Specific naming conventions",
              "Calling conventions for function calls",
              "Special registers for system operations"
            ],
            testPoints: [
              "Register number to name conversion",
              "Calling convention rules",
              "Register usage in function calls"
            ]
          }
        ]
      },
      {
        id: "datapath",
        title: "3. Single-Cycle Datapath Design",
        description: "Complete analysis of MIPS single-cycle processor implementation",
        topics: [
          {
            term: "Datapath Components",
            layDefinition: "The physical 'roads' and 'highways' inside the processor that data travels along - like the plumbing and electrical systems in a building.",
            technicalDefinition: "The collection of functional units (registers, ALU, memory, multiplexers) and the interconnections that allow data to flow between them during instruction execution.",
            components: [
              {
                name: "Program Counter (PC)",
                purpose: "Holds the address of the current instruction",
                layDescription: "Like a bookmark that keeps track of which instruction the computer is currently working on",
                technicalDescription: "32-bit register that stores the memory address of the instruction being executed"
              },
              {
                name: "Instruction Memory",
                purpose: "Stores all program instructions",
                layDescription: "Like a bookshelf that holds all the recipe cards (instructions) for the program",
                technicalDescription: "Read-only memory containing the program instructions, addressed by PC"
              },
              {
                name: "Register File",
                purpose: "Fast storage for 32 general-purpose registers",
                layDescription: "Like a filing cabinet with 32 drawers, each holding one number",
                technicalDescription: "32 registers × 32 bits each, with read/write ports for simultaneous access"
              },
              {
                name: "ALU (Arithmetic Logic Unit)",
                purpose: "Performs arithmetic and logical operations",
                layDescription: "Like a calculator that can add, subtract, compare, and do other math operations",
                technicalDescription: "Combinational circuit that performs arithmetic (add, sub) and logical (and, or, slt) operations"
              },
              {
                name: "Data Memory",
                purpose: "Stores program data and variables",
                layDescription: "Like a warehouse that holds all the data the program needs to work with",
                technicalDescription: "Read/write memory for storing data, accessed by load/store instructions"
              }
            ],
            keyPoints: [
              "All components connected by data paths",
              "Control signals determine data flow",
              "Single-cycle: one instruction per clock cycle",
              "Combinational and sequential elements"
            ],
            testPoints: [
              "Component identification and purpose",
              "Data flow through datapath",
              "Control signal requirements"
            ]
          },
          {
            term: "Instruction Execution Flow",
            layDefinition: "The step-by-step process of how the computer carries out each instruction - like following a recipe from start to finish.",
            technicalDefinition: "The sequence of operations performed by the datapath to execute a single instruction, including fetch, decode, execute, memory access, and writeback phases.",
            phases: [
              {
                name: "Instruction Fetch",
                layDescription: "Get the instruction from memory",
                technicalDescription: "PC → Instruction Memory → 32-bit instruction",
                operations: [
                  "Read instruction from memory using PC",
                  "Increment PC by 4 (PC = PC + 4)"
                ]
              },
              {
                name: "Instruction Decode",
                layDescription: "Figure out what the instruction wants to do",
                technicalDescription: "Parse instruction fields and read register values",
                operations: [
                  "Extract opcode, rs, rt, rd, immediate, funct",
                  "Read source registers from register file",
                  "Generate control signals"
                ]
              },
              {
                name: "Execute",
                layDescription: "Do the actual work (math, comparison, etc.)",
                technicalDescription: "Perform ALU operation based on instruction type",
                operations: [
                  "ALU performs operation (add, sub, and, or, slt)",
                  "Calculate branch target address",
                  "Determine if branch should be taken"
                ]
              },
              {
                name: "Memory Access",
                layDescription: "Load or store data if needed",
                technicalDescription: "Access data memory for load/store instructions",
                operations: [
                  "Load: Read data from memory address",
                  "Store: Write data to memory address",
                  "Other instructions: No memory access"
                ]
              },
              {
                name: "Writeback",
                layDescription: "Save the result back to a register",
                technicalDescription: "Write result back to destination register",
                operations: [
                  "ALU result → destination register",
                  "Memory data → destination register (for loads)",
                  "Update PC for branches/jumps"
                ]
              }
            ],
            keyPoints: [
              "All phases complete in one clock cycle",
              "Different instruction types use different phases",
              "Control signals determine which phases are active",
              "PC update happens in different phases for different instructions"
            ],
            testPoints: [
              "Phase sequence for different instruction types",
              "Control signal generation per phase",
              "Data flow through each phase"
            ]
          },
          {
            term: "Control Unit Design",
            layDefinition: "The 'traffic controller' that tells all the components what to do and when to do it - like a conductor directing an orchestra.",
            technicalDefinition: "Combinational logic that generates control signals based on the instruction opcode and function code to control data flow through the datapath.",
            controlSignals: [
              {
                signal: "RegDst",
                purpose: "Selects destination register (rd vs rt)",
                values: "0 = rt (I-type), 1 = rd (R-type)",
                layDescription: "Decides which register to write the result to"
              },
              {
                signal: "ALUSrc",
                purpose: "Selects ALU second input (register vs immediate)",
                values: "0 = register (R-type), 1 = immediate (I-type)",
                layDescription: "Decides whether to use a register value or a constant"
              },
              {
                signal: "MemToReg",
                purpose: "Selects data to write to register (ALU vs memory)",
                values: "0 = ALU result, 1 = memory data (loads)",
                layDescription: "Decides whether to save the calculation result or data from memory"
              },
              {
                signal: "RegWrite",
                purpose: "Enables writing to register file",
                values: "0 = no write, 1 = write to register",
                layDescription: "Turns on/off the ability to save results to registers"
              },
              {
                signal: "MemRead",
                purpose: "Enables reading from data memory",
                values: "0 = no read, 1 = read from memory",
                layDescription: "Turns on/off reading data from memory"
              },
              {
                signal: "MemWrite",
                purpose: "Enables writing to data memory",
                values: "0 = no write, 1 = write to memory",
                layDescription: "Turns on/off saving data to memory"
              },
              {
                signal: "Branch",
                purpose: "Enables branch instruction execution",
                values: "0 = no branch, 1 = branch if condition met",
                layDescription: "Decides whether to jump to a different part of the program"
              },
              {
                signal: "Jump",
                purpose: "Enables jump instruction execution",
                values: "0 = no jump, 1 = unconditional jump",
                layDescription: "Decides whether to jump to a completely different location"
              },
              {
                signal: "ALUOp",
                purpose: "Controls ALU operation selection",
                values: "00 = add (load/store), 01 = subtract (branch), 10 = funct field (R-type)",
                layDescription: "Tells the ALU what kind of math to do"
              }
            ],
            instructionTypes: [
              {
                type: "R-type (add, sub, and, or, slt)",
                signals: "RegDst=1, ALUSrc=0, MemToReg=0, RegWrite=1, MemRead=0, MemWrite=0, Branch=0, Jump=0, ALUOp=10"
              },
              {
                type: "Load (lw)",
                signals: "RegDst=0, ALUSrc=1, MemToReg=1, RegWrite=1, MemRead=1, MemWrite=0, Branch=0, Jump=0, ALUOp=00"
              },
              {
                type: "Store (sw)",
                signals: "RegDst=X, ALUSrc=1, MemToReg=X, RegWrite=0, MemRead=0, MemWrite=1, Branch=0, Jump=0, ALUOp=00"
              },
              {
                type: "Branch (beq)",
                signals: "RegDst=X, ALUSrc=0, MemToReg=X, RegWrite=0, MemRead=0, MemWrite=0, Branch=1, Jump=0, ALUOp=01"
              },
              {
                type: "Jump (j, jal)",
                signals: "RegDst=X, ALUSrc=X, MemToReg=X, RegWrite=0, MemRead=0, MemWrite=0, Branch=0, Jump=1, ALUOp=XX"
              }
            ],
            keyPoints: [
              "Control signals generated from opcode",
              "ALUOp field controls ALU function selection",
              "Different instruction types need different signals",
              "X means 'don't care' (signal not used)"
            ],
            testPoints: [
              "Control signal table for all instruction types",
              "Signal generation from opcode",
              "ALUOp encoding and ALU control"
            ]
          }
        ]
      },
      {
        id: "memory_systems",
        title: "4. Memory Organization and Hierarchy",
        description: "Complete coverage of memory systems and building blocks",
        topics: [
          {
            term: "Memory Hierarchy",
            layDefinition: "A system of different types of storage, from fast and expensive (like a small, fast sports car) to slow and cheap (like a large, slow truck) - each serving different purposes.",
            technicalDefinition: "A storage system organized in levels with different access times, capacities, and costs, where faster levels store frequently accessed data.",
            levels: [
              {
                name: "Registers",
                speed: "Fastest (1 cycle)",
                size: "Smallest (32 × 32-bit)",
                cost: "Most expensive",
                layDescription: "Like a small, fast notepad on your desk",
                technicalDescription: "Fastest storage, directly accessible by ALU"
              },
              {
                name: "Cache",
                speed: "Very fast (1-10 cycles)",
                size: "Small (KB to MB)",
                cost: "Expensive",
                layDescription: "Like a small, fast filing cabinet near your desk",
                technicalDescription: "Fast memory that stores frequently accessed data"
              },
              {
                name: "Main Memory (RAM)",
                speed: "Fast (10-100 cycles)",
                size: "Medium (GB)",
                cost: "Moderate",
                layDescription: "Like a large filing cabinet in your office",
                technicalDescription: "Primary storage for programs and data"
              },
              {
                name: "Secondary Storage",
                speed: "Slow (millions of cycles)",
                size: "Large (TB)",
                cost: "Cheapest",
                layDescription: "Like a warehouse for long-term storage",
                technicalDescription: "Persistent storage (hard drives, SSDs)"
              }
            ],
            principles: [
              "Locality of reference - programs access nearby data",
              "Temporal locality - recently accessed data likely to be accessed again",
              "Spatial locality - nearby data likely to be accessed",
              "Cache hit - data found in faster memory",
              "Cache miss - data not found, must fetch from slower memory"
            ],
            keyPoints: [
              "Trade-off between speed, size, and cost",
              "Automatic data movement between levels",
              "Performance depends on hit rates",
              "Virtual memory extends main memory"
            ],
            testPoints: [
              "Memory hierarchy levels and characteristics",
              "Locality principles",
              "Cache hit/miss analysis",
              "Performance impact of memory access"
            ]
          },
          {
            term: "Cache Memory",
            layDefinition: "A small, super-fast storage area that keeps copies of frequently used data - like keeping your most-used tools on your desk instead of in the garage.",
            technicalDefinition: "A small, fast memory that stores copies of frequently accessed data from main memory, organized in blocks with specific mapping and replacement policies.",
            organization: [
              {
                type: "Direct Mapped",
                layDescription: "Each memory location can only go to one specific cache location",
                technicalDescription: "Each memory block maps to exactly one cache block",
                formula: "Cache block = (Memory address) mod (Number of cache blocks)",
                pros: "Simple, fast access",
                cons: "Conflict misses when multiple blocks map to same location"
              },
              {
                type: "Set Associative",
                layDescription: "Each memory location can go to a small group of cache locations",
                technicalDescription: "Cache divided into sets, each set contains multiple blocks",
                formula: "Set = (Memory address) mod (Number of sets)",
                pros: "Reduces conflicts, good performance",
                cons: "More complex than direct mapped"
              },
              {
                type: "Fully Associative",
                layDescription: "Any memory location can go to any cache location",
                technicalDescription: "Any memory block can be placed in any cache block",
                pros: "No conflicts, best hit rate",
                cons: "Most complex, slowest access"
              }
            ],
            replacementPolicies: [
              {
                name: "LRU (Least Recently Used)",
                description: "Replace the block that hasn't been used for the longest time",
                layDescription: "Like throwing away the tool you haven't used in the longest time"
              },
              {
                name: "FIFO (First In, First Out)",
                description: "Replace the block that has been in cache the longest",
                layDescription: "Like throwing away the tool that's been on your desk the longest"
              },
              {
                name: "Random",
                description: "Replace a randomly selected block",
                layDescription: "Like randomly picking a tool to throw away"
              }
            ],
            keyPoints: [
              "Cache size vs hit rate trade-off",
              "Block size affects spatial locality",
              "Associativity reduces conflicts",
              "Write policies (write-through vs write-back)"
            ],
            testPoints: [
              "Cache mapping calculations",
              "Hit/miss rate analysis",
              "Replacement policy effects",
              "Cache performance metrics"
            ]
          },
          {
            term: "Memory Arrays",
            layDefinition: "Organized storage systems that can hold lots of data in a structured way - like a library with numbered shelves and books.",
            technicalDefinition: "Structured memory systems using arrays of storage cells, with addressing mechanisms to access specific locations efficiently.",
            types: [
              {
                name: "SRAM (Static RAM)",
                layDescription: "Fast memory that keeps data as long as power is on",
                technicalDescription: "Memory that retains data as long as power is supplied, using flip-flops",
                characteristics: [
                  "Fast access time (1-10 ns)",
                  "Expensive (6 transistors per cell)",
                  "Used for cache memory",
                  "Volatile (loses data when power off)"
                ]
              },
              {
                name: "DRAM (Dynamic RAM)",
                layDescription: "Cheaper memory that needs constant refreshing to keep data",
                technicalDescription: "Memory that stores data as charge on capacitors, requiring periodic refresh",
                characteristics: [
                  "Slower access time (50-100 ns)",
                  "Cheaper (1 transistor + 1 capacitor per cell)",
                  "Used for main memory",
                  "Needs refresh every few milliseconds"
                ]
              }
            ],
            addressing: [
              {
                concept: "Row/Column Addressing",
                layDescription: "Like finding a book by shelf number and position on shelf",
                technicalDescription: "Memory organized in rows and columns, accessed by row address then column address",
                process: [
                  "Row address selects a row of cells",
                  "Column address selects specific cell in row",
                  "Data appears on output after access time"
                ]
              },
              {
                concept: "Word Selection",
                layDescription: "Picking out the specific word you want from a line of words",
                technicalDescription: "Selecting specific bits from a memory word using address bits",
                process: [
                  "Address bits select word line",
                  "Data bits appear on bit lines",
                  "Sense amplifiers detect and amplify signals"
                ]
              }
            ],
            keyPoints: [
              "Memory organization affects access time",
              "Address decoding selects specific locations",
              "Refresh requirements for DRAM",
              "Error detection and correction"
            ],
            testPoints: [
              "Memory addressing calculations",
              "SRAM vs DRAM characteristics",
              "Memory access timing",
              "Address decoding logic"
            ]
          }
        ]
      },
      {
        id: "performance",
        title: "5. Performance Analysis and Optimization",
        description: "Understanding processor performance and optimization techniques",
        topics: [
          {
            term: "Performance Metrics",
            layDefinition: "Ways to measure how fast and efficient a computer is - like timing how long it takes to complete different tasks.",
            technicalDefinition: "Quantitative measures of processor performance including execution time, throughput, and efficiency metrics.",
            metrics: [
              {
                name: "Execution Time",
                layDescription: "How long it takes to complete a program",
                technicalDescription: "Total time to execute a program, measured in seconds",
                formula: "Execution Time = Instruction Count × CPI × Clock Period",
                units: "Seconds (s)"
              },
              {
                name: "CPI (Cycles Per Instruction)",
                layDescription: "Average number of clock cycles needed for each instruction",
                technicalDescription: "Average number of clock cycles required to execute one instruction",
                formula: "CPI = Total Cycles / Instruction Count",
                units: "Cycles per instruction"
              },
              {
                name: "Clock Rate",
                layDescription: "How fast the processor's clock ticks",
                technicalDescription: "Frequency of the processor clock, measured in cycles per second",
                formula: "Clock Rate = 1 / Clock Period",
                units: "Hertz (Hz) or cycles per second"
              },
              {
                name: "Throughput",
                layDescription: "How many instructions can be completed per second",
                technicalDescription: "Rate of instruction execution, measured in instructions per second",
                formula: "Throughput = Clock Rate / CPI",
                units: "Instructions per second (IPS)"
              }
            ],
            performanceEquation: {
              formula: "Execution Time = (Instruction Count × CPI) / Clock Rate",
              components: [
                "Instruction Count - depends on program and compiler",
                "CPI - depends on processor architecture",
                "Clock Rate - depends on technology and design"
              ],
              optimization: [
                "Reduce instruction count (better algorithms, compiler optimization)",
                "Reduce CPI (pipelining, better architecture)",
                "Increase clock rate (faster technology, better design)"
              ]
            },
            keyPoints: [
              "Multiple factors affect performance",
              "Trade-offs between different optimizations",
              "Benchmarking for fair comparisons",
              "Amdahl's Law for parallel processing"
            ],
            testPoints: [
              "Performance calculation from given parameters",
              "CPI analysis for different instruction mixes",
              "Performance comparison between processors",
              "Optimization strategy selection"
            ]
          },
          {
            term: "Amdahl's Law",
            layDefinition: "A rule that shows how much faster a program can get when you improve only part of it - like making only the engine faster in a car, not the whole car.",
            technicalDefinition: "A formula that determines the theoretical maximum speedup achievable when improving only a portion of a system, showing the diminishing returns of partial optimization.",
            formula: "Speedup = 1 / ((1 - P) + (P / S))",
            variables: [
              "P = fraction of program that can be improved",
              "S = speedup factor for the improved portion",
              "1 - P = fraction that cannot be improved"
            ],
            examples: [
              {
                scenario: "Improve 50% of program by 2x",
                calculation: "P = 0.5, S = 2",
                result: "Speedup = 1 / (0.5 + 0.5/2) = 1 / 0.75 = 1.33x"
              },
              {
                scenario: "Improve 90% of program by 10x",
                calculation: "P = 0.9, S = 10", 
                result: "Speedup = 1 / (0.1 + 0.9/10) = 1 / 0.19 = 5.26x"
              },
              {
                scenario: "Improve 10% of program by infinite speedup",
                calculation: "P = 0.1, S = ∞",
                result: "Speedup = 1 / (0.9 + 0.1/∞) = 1 / 0.9 = 1.11x"
              }
            ],
            implications: [
              "Diminishing returns from partial optimization",
              "Bottlenecks limit overall performance",
              "Focus on the slowest parts first",
              "Parallel processing benefits depend on parallelizable fraction"
            ],
            keyPoints: [
              "Shows limits of partial optimization",
              "Identifies performance bottlenecks",
              "Guides optimization priorities",
              "Applies to both hardware and software"
            ],
            testPoints: [
              "Speedup calculation from Amdahl's Law",
              "Identifying performance bottlenecks",
              "Optimization strategy based on law",
              "Parallel processing analysis"
            ]
          }
        ]
      },
      {
        id: "assembly_programming",
        title: "6. Assembly Language Programming",
        description: "Complete guide to MIPS assembly programming with practical examples",
        topics: [
          {
            term: "Assembly Language Basics",
            layDefinition: "A human-readable way to write instructions for the computer - like writing a recipe in plain English instead of using secret codes.",
            technicalDefinition: "A low-level programming language that uses mnemonics to represent machine instructions, providing a more readable alternative to machine code.",
            keyConcepts: [
              "One-to-one correspondence with machine instructions",
              "Assembly directives for data and program organization",
              "Labels for program flow control",
              "Comments for code documentation"
            ],
            examples: [
              {
                name: "Basic Assembly Structure",
                description: ".data\n  msg: .asciiz \"Hello World\"\n.text\n  main:\n    li $v0, 4\n    la $a0, msg\n    syscall"
              },
              {
                name: "Assembly vs Machine Code",
                description: "Assembly: add $t0, $t1, $t2 → Machine: 000000 01001 01010 01000 00000 100000"
              }
            ],
            testPoints: [
              "Write basic assembly programs",
              "Understand assembly directives",
              "Convert between assembly and machine code"
            ]
          },
          {
            term: "Data Types and Memory Layout",
            layDefinition: "Different ways to store information in memory - like having different sized boxes for different types of items.",
            technicalDefinition: "Assembly language support for various data types including integers, characters, strings, and arrays, with specific memory layout requirements.",
            keyConcepts: [
              "Word (32-bit), halfword (16-bit), byte (8-bit) data types",
              "Memory alignment requirements",
              "Little-endian vs big-endian byte ordering",
              "Stack and heap memory organization"
            ],
            examples: [
              {
                name: "Data Declaration",
                description: ".data\n  num: .word 42\n  str: .asciiz \"Hello\"\n  arr: .word 1, 2, 3, 4"
              },
              {
                name: "Memory Layout",
                description: "Text segment (instructions) → Data segment (variables) → Stack (grows down) → Heap (grows up)"
              }
            ],
            testPoints: [
              "Declare different data types",
              "Understand memory alignment",
              "Design data structures in assembly"
            ]
          },
          {
            term: "Control Flow and Branching",
            layDefinition: "Making decisions and repeating actions in programs - like choosing which path to take or doing something over and over.",
            technicalDefinition: "Assembly language constructs for conditional execution and loops, including branch instructions and jump instructions.",
            keyConcepts: [
              "Conditional branches (beq, bne, blt, bgt, ble, bge)",
              "Unconditional jumps (j, jal, jr)",
              "Loop implementation using branches",
              "Function calls and return addresses"
            ],
            examples: [
              {
                name: "If-Then-Else Structure",
                description: "beq $t0, $t1, then\n  # else code\n  j end\n  then:\n    # then code\n  end:"
              },
              {
                name: "Loop Implementation",
                description: "loop:\n  # loop body\n  addi $t0, $t0, -1\n  bgtz $t0, loop"
              }
            ],
            testPoints: [
              "Implement conditional statements",
              "Write loop structures",
              "Handle function calls and returns"
            ]
          },
          {
            term: "Function Calls and Stack Management",
            layDefinition: "Organizing code into reusable pieces and managing temporary storage - like creating a recipe book and keeping track of ingredients.",
            technicalDefinition: "Assembly language conventions for function calls, parameter passing, local variable storage, and stack frame management.",
            keyConcepts: [
              "Calling conventions (MIPS standard)",
              "Parameter passing via registers and stack",
              "Stack frame creation and destruction",
              "Register saving and restoration"
            ],
            examples: [
              {
                name: "Function Call Example",
                description: "main:\n  li $a0, 5\n  li $a1, 3\n  jal add_function\n  # result in $v0"
              },
              {
                name: "Stack Frame",
                description: "Function prologue: save $ra, $fp; allocate local variables; Function epilogue: restore registers, return"
              }
            ],
            testPoints: [
              "Implement function calls",
              "Manage stack frames",
              "Follow calling conventions"
            ]
          }
        ]
      },
      {
        id: "number_systems",
        title: "7. Number Systems and Arithmetic",
        description: "Understanding how computers represent and manipulate numbers",
        topics: [
          {
            term: "Binary Number System",
            layDefinition: "A counting system that only uses two digits (0 and 1) - like a light switch that can only be on or off.",
            technicalDefinition: "A base-2 positional number system using only digits 0 and 1, where each position represents a power of 2.",
            keyConcepts: [
              "Positional notation with base 2",
              "Each bit represents a power of 2",
              "Most significant bit (MSB) and least significant bit (LSB)",
              "Binary to decimal conversion"
            ],
            examples: [
              {
                name: "Binary to Decimal",
                description: "1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11₁₀"
              },
              {
                name: "Decimal to Binary",
                description: "13₁₀ = 8 + 4 + 1 = 1101₂"
              }
            ],
            testPoints: [
              "Convert between binary and decimal",
              "Identify MSB and LSB positions",
              "Understand positional weights"
            ]
          },
          {
            term: "Two's Complement Representation",
            layDefinition: "A clever way to represent negative numbers using only 0s and 1s - like using a thermometer that can show both positive and negative temperatures.",
            technicalDefinition: "A method for representing signed integers where the most significant bit indicates sign, and negative numbers are represented as the two's complement of their positive equivalent.",
            keyConcepts: [
              "MSB indicates sign (0 = positive, 1 = negative)",
              "Range: -2^(n-1) to 2^(n-1) - 1 for n bits",
              "Two's complement of x = 2^n - x",
              "Addition works the same for positive and negative numbers"
            ],
            examples: [
              {
                name: "8-bit Two's Complement",
                description: "Range: -128 to +127, -1 = 11111111₂"
              },
              {
                name: "Two's Complement Calculation",
                description: "To find -5 in 8-bit: 00000101 → 11111010 → 11111011"
              }
            ],
            testPoints: [
              "Convert numbers to two's complement",
              "Perform arithmetic in two's complement",
              "Identify overflow conditions"
            ]
          },
          {
            term: "Floating Point Representation",
            layDefinition: "A way to store decimal numbers (like 3.14159) in binary - like scientific notation but for computers.",
            technicalDefinition: "IEEE 754 standard for representing real numbers using sign, exponent, and mantissa fields in a fixed number of bits.",
            keyConcepts: [
              "IEEE 754 single precision (32-bit) and double precision (64-bit)",
              "Sign bit, exponent field, mantissa (significand) field",
              "Bias for exponent representation",
              "Special values: zero, infinity, NaN"
            ],
            examples: [
              {
                name: "IEEE 754 Single Precision",
                description: "1 bit sign + 8 bits exponent + 23 bits mantissa"
              },
              {
                name: "Floating Point Example",
                description: "3.14159 ≈ 1.10010010000111111011011 × 2¹"
              }
            ],
            testPoints: [
              "Convert decimal to IEEE 754 format",
              "Identify special floating point values",
              "Understand precision and rounding"
            ]
          }
        ]
      },
      {
        id: "logic_gates",
        title: "8. Digital Logic and Gates",
        description: "Fundamental building blocks of digital circuits",
        topics: [
          {
            term: "Basic Logic Gates",
            layDefinition: "The simplest 'decision makers' in a computer - like traffic lights that decide when to let cars through.",
            technicalDefinition: "Electronic circuits that implement Boolean logic functions, taking one or more binary inputs and producing a single binary output.",
            keyConcepts: [
              "AND gate: output is 1 only when all inputs are 1",
              "OR gate: output is 1 when any input is 1",
              "NOT gate: output is opposite of input",
              "NAND, NOR, XOR, XNOR gates"
            ],
            examples: [
              {
                name: "AND Gate Truth Table",
                description: "A=0, B=0 → Output=0; A=0, B=1 → Output=0; A=1, B=0 → Output=0; A=1, B=1 → Output=1"
              },
              {
                name: "OR Gate Truth Table", 
                description: "A=0, B=0 → Output=0; A=0, B=1 → Output=1; A=1, B=0 → Output=1; A=1, B=1 → Output=1"
              }
            ],
            testPoints: [
              "Draw truth tables for all gates",
              "Implement Boolean functions using gates",
              "Understand gate propagation delays"
            ]
          },
          {
            term: "Combinational Logic",
            layDefinition: "Circuits where the output depends only on the current inputs - like a calculator that gives the same answer every time you press the same buttons.",
            technicalDefinition: "Digital circuits where the output is a function of the current input values only, with no memory or feedback.",
            keyConcepts: [
              "Output depends only on current inputs",
              "No memory elements (flip-flops)",
              "Examples: adders, multiplexers, decoders",
              "Can be described by Boolean equations"
            ],
            examples: [
              {
                name: "Half Adder",
                description: "Adds two 1-bit numbers: Sum = A ⊕ B, Carry = A · B"
              },
              {
                name: "Full Adder",
                description: "Adds three 1-bit numbers including carry-in"
              }
            ],
            testPoints: [
              "Design combinational circuits",
              "Write Boolean equations",
              "Minimize logic expressions"
            ]
          },
          {
            term: "Sequential Logic",
            layDefinition: "Circuits that 'remember' previous inputs - like a light switch that stays on even after you let go.",
            technicalDefinition: "Digital circuits where the output depends on both current inputs and previous states, using memory elements like flip-flops.",
            keyConcepts: [
              "Output depends on current inputs and previous state",
              "Contains memory elements (flip-flops)",
              "Clock signal controls state changes",
              "Examples: registers, counters, state machines"
            ],
            examples: [
              {
                name: "D Flip-Flop",
                description: "Stores one bit: Q(t+1) = D(t) on clock edge"
              },
              {
                name: "4-bit Register",
                description: "Four D flip-flops storing 4 bits of data"
              }
            ],
            testPoints: [
              "Design sequential circuits",
              "Understand clocking and timing",
              "Analyze state machines"
            ]
          }
        ]
      },
      {
        id: "pipelining",
        title: "9. Pipelining and Performance",
        description: "Advanced processor design techniques for improved performance",
        topics: [
          {
            term: "Pipeline Stages",
            layDefinition: "Breaking down instruction execution into smaller steps, like an assembly line where each worker does one specific task.",
            technicalDefinition: "A technique that overlaps the execution of multiple instructions by dividing instruction processing into discrete stages.",
            keyConcepts: [
              "5-stage MIPS pipeline: IF, ID, EX, MEM, WB",
              "Each stage takes one clock cycle",
              "Multiple instructions in different stages simultaneously",
              "Throughput = 1 instruction per cycle (ideal)"
            ],
            examples: [
              {
                name: "5-Stage Pipeline",
                description: "IF (Instruction Fetch) → ID (Instruction Decode) → EX (Execute) → MEM (Memory Access) → WB (Write Back)"
              },
              {
                name: "Pipeline Timing",
                description: "Without pipeline: 5 cycles per instruction; With pipeline: 1 cycle per instruction (after startup)"
              }
            ],
            testPoints: [
              "Draw pipeline diagrams",
              "Calculate pipeline speedup",
              "Identify pipeline hazards"
            ]
          },
          {
            term: "Pipeline Hazards",
            layDefinition: "Problems that occur when instructions interfere with each other in the pipeline - like two people trying to use the same tool at the same time.",
            technicalDefinition: "Situations that prevent the next instruction from executing in the following clock cycle, reducing pipeline efficiency.",
            keyConcepts: [
              "Structural hazards: resource conflicts",
              "Data hazards: data dependencies",
              "Control hazards: branch instructions",
              "Hazard detection and resolution"
            ],
            examples: [
              {
                name: "Data Hazard",
                description: "add $t0, $t1, $t2; sub $t3, $t0, $t4 (t0 not ready when sub needs it)"
              },
              {
                name: "Control Hazard",
                description: "beq $t0, $t1, label; add $t2, $t3, $t4 (don't know if branch taken)"
              }
            ],
            testPoints: [
              "Identify different types of hazards",
              "Design hazard detection circuits",
              "Implement forwarding and stalling"
            ]
          },
          {
            term: "Branch Prediction",
            layDefinition: "Guessing which way a program will go at a fork in the road - like predicting which path a car will take at an intersection.",
            technicalDefinition: "Techniques for predicting the outcome of branch instructions to minimize pipeline stalls and improve performance.",
            keyConcepts: [
              "Static prediction: always taken/not taken",
              "Dynamic prediction: based on history",
              "Branch target buffer (BTB)",
              "Misprediction penalty"
            ],
            examples: [
              {
                name: "Static Prediction",
                description: "Backward branches (loops) usually taken, forward branches usually not taken"
              },
              {
                name: "Dynamic Prediction",
                description: "2-bit predictor: strongly taken, weakly taken, weakly not taken, strongly not taken"
              }
            ],
            testPoints: [
              "Calculate branch prediction accuracy",
              "Design prediction algorithms",
              "Analyze misprediction costs"
            ]
          }
        ]
      },
      {
        id: "cache_memory",
        title: "10. Cache Memory Systems",
        description: "High-speed memory systems for improved performance",
        topics: [
          {
            term: "Cache Organization",
            layDefinition: "A small, super-fast storage area that keeps copies of frequently used data - like keeping your most-used tools on your desk instead of in the garage.",
            technicalDefinition: "A small, fast memory that stores copies of frequently accessed data from main memory, organized in blocks with specific mapping and replacement policies.",
            keyConcepts: [
              "Cache blocks and block size",
              "Cache lines and tags",
              "Valid and dirty bits",
              "Cache indexing and tagging"
            ],
            examples: [
              {
                name: "Direct Mapped Cache",
                description: "Each memory block maps to exactly one cache block using: Cache block = (Memory address) mod (Number of cache blocks)"
              },
              {
                name: "Set Associative Cache",
                description: "Cache divided into sets, each set contains multiple blocks"
              }
            ],
            testPoints: [
              "Calculate cache parameters",
              "Determine cache hits and misses",
              "Design cache mapping schemes"
            ]
          },
          {
            term: "Cache Performance",
            layDefinition: "Measuring how well the cache system works - like timing how often you find what you need in your desk drawer.",
            technicalDefinition: "Quantitative analysis of cache effectiveness using hit rates, miss rates, and average access time calculations.",
            keyConcepts: [
              "Hit rate = Hits / (Hits + Misses)",
              "Miss rate = 1 - Hit rate",
              "Average access time = Hit time + Miss rate × Miss penalty",
              "Cache performance metrics"
            ],
            examples: [
              {
                name: "Performance Calculation",
                description: "Hit time = 1 cycle, Miss penalty = 100 cycles, Hit rate = 95% → Average access time = 1 + 0.05 × 100 = 6 cycles"
              },
              {
                name: "Cache Size Impact",
                description: "Larger caches generally have higher hit rates but longer access times"
              }
            ],
            testPoints: [
              "Calculate cache performance metrics",
              "Analyze cache size vs performance trade-offs",
              "Design cache hierarchies"
            ]
          },
          {
            term: "Cache Coherence",
            layDefinition: "Making sure all copies of the same data stay the same - like ensuring everyone has the same version of a document.",
            technicalDefinition: "Maintaining consistency of data stored in multiple caches in a multiprocessor system.",
            keyConcepts: [
              "Multiple processors may cache same data",
              "Write operations must update all copies",
              "Coherence protocols (MESI, MOESI)",
              "Invalidation vs update protocols"
            ],
            examples: [
              {
                name: "MESI Protocol",
                description: "Modified, Exclusive, Shared, Invalid states for cache blocks"
              },
              {
                name: "Write Invalidate",
                description: "When one processor writes, invalidate copies in other caches"
              }
            ],
            testPoints: [
              "Understand coherence protocols",
              "Analyze cache coherence overhead",
              "Design multiprocessor cache systems"
            ]
          }
        ]
      },
      {
        id: "virtual_memory",
        title: "11. Virtual Memory Systems",
        description: "Memory management and address translation",
        topics: [
          {
            term: "Virtual Address Space",
            layDefinition: "A virtual 'address book' that programs use to find data, which gets translated to real physical locations - like using a GPS that converts street addresses to actual coordinates.",
            technicalDefinition: "A logical address space that provides programs with the illusion of having more memory than physically available, managed by the operating system.",
            keyConcepts: [
              "Virtual addresses vs physical addresses",
              "Address space larger than physical memory",
              "Memory protection and isolation",
              "Demand paging and swapping"
            ],
            examples: [
              {
                name: "32-bit Virtual Address",
                description: "Can address 4GB of virtual memory, but system may have only 1GB physical RAM"
              },
              {
                name: "Address Translation",
                description: "Virtual address 0x12345678 → Physical address 0x87654321"
              }
            ],
            testPoints: [
              "Understand virtual vs physical addressing",
              "Calculate address space sizes",
              "Design address translation schemes"
            ]
          },
          {
            term: "Page Tables",
            layDefinition: "A lookup table that translates virtual page numbers to physical page numbers - like a phone book that converts names to phone numbers.",
            technicalDefinition: "Data structures that map virtual page numbers to physical page numbers, including protection and status information.",
            keyConcepts: [
              "Page table entries (PTEs)",
              "Valid, dirty, and reference bits",
              "Page table organization",
              "Translation lookaside buffer (TLB)"
            ],
            examples: [
              {
                name: "Page Table Entry",
                description: "Valid bit, Physical page number, Protection bits, Dirty bit, Reference bit"
              },
              {
                name: "TLB Hit",
                description: "Fast translation using cached page table entries"
              }
            ],
            testPoints: [
              "Design page table structures",
              "Calculate TLB performance",
              "Understand page replacement algorithms"
            ]
          },
          {
            term: "Page Replacement Algorithms",
            layDefinition: "Rules for deciding which page to remove when memory is full - like deciding which book to take off a full shelf to make room for a new one.",
            technicalDefinition: "Algorithms that determine which page to evict from physical memory when a page fault occurs and no free frames are available.",
            keyConcepts: [
              "FIFO (First In, First Out)",
              "LRU (Least Recently Used)",
              "LFU (Least Frequently Used)",
              "Optimal replacement"
            ],
            examples: [
              {
                name: "LRU Algorithm",
                description: "Replace the page that hasn't been used for the longest time"
              },
              {
                name: "Optimal Algorithm",
                description: "Replace the page that will be used furthest in the future (theoretical)"
              }
            ],
            testPoints: [
              "Implement page replacement algorithms",
              "Analyze algorithm performance",
              "Compare different replacement strategies"
            ]
          }
        ]
      }
    ]
  },
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
    },

    // Pre-Midterm Practice Questions - Assembly Language Programming
    {
      question: "What is the purpose of the .text directive in MIPS assembly?",
      options: [
        "Defines the data section of the program",
        "Marks the beginning of executable code",
        "Specifies the stack segment",
        "Declares global variables"
      ],
      correct: 1,
      explanation: "The .text directive marks the beginning of the code section containing executable instructions.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which directive is used to declare a string in MIPS assembly?",
      options: [
        ".asciiz",
        ".string",
        ".text",
        ".data"
      ],
      correct: 0,
      explanation: "The .asciiz directive declares a null-terminated string in the data section.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "What does the 'la' pseudo-instruction do?",
      options: [
        "Loads an address into a register",
        "Loads a value from memory",
        "Stores a value to memory",
        "Performs arithmetic addition"
      ],
      correct: 0,
      explanation: "The 'la' (load address) pseudo-instruction loads the address of a label into a register.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction is used to call a function in MIPS?",
      options: [
        "call",
        "jal",
        "j",
        "jr"
      ],
      correct: 1,
      explanation: "The 'jal' (jump and link) instruction is used to call functions, storing the return address in $ra.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the $ra register?",
      options: [
        "Stores function arguments",
        "Stores the return address",
        "Stores temporary values",
        "Stores the stack pointer"
      ],
      correct: 1,
      explanation: "The $ra register stores the return address for function calls.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which registers are used to pass the first four arguments to a function?",
      options: [
        "$t0-$t3",
        "$s0-$s3",
        "$a0-$a3",
        "$v0-$v3"
      ],
      correct: 2,
      explanation: "The $a0-$a3 registers are used to pass the first four arguments to functions.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "What does the 'li' pseudo-instruction do?",
      options: [
        "Loads an immediate value into a register",
        "Loads a value from memory",
        "Stores a value to memory",
        "Performs logical AND"
      ],
      correct: 0,
      explanation: "The 'li' (load immediate) pseudo-instruction loads an immediate value into a register.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "Which instruction is used to return from a function?",
      options: [
        "ret",
        "jr $ra",
        "return",
        "j $ra"
      ],
      correct: 1,
      explanation: "The 'jr $ra' instruction jumps to the address stored in $ra, returning from a function.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the stack pointer ($sp)?",
      options: [
        "Points to the top of the stack",
        "Points to the bottom of the stack",
        "Stores function arguments",
        "Stores return values"
      ],
      correct: 0,
      explanation: "The stack pointer ($sp) points to the top of the stack, used for local variables and function calls.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "Which instruction is used to push a value onto the stack?",
      options: [
        "push",
        "sw $reg, 0($sp); addi $sp, $sp, -4",
        "pop",
        "lw $reg, 0($sp)"
      ],
      correct: 1,
      explanation: "To push: store the value at the stack pointer, then decrement the stack pointer by 4.",
      category: "assembly",
      difficulty: "hard"
    },

    // Pre-Midterm Practice Questions - Machine Language
    {
      question: "What is the size of a MIPS instruction in bits?",
      options: [
        "16 bits",
        "32 bits",
        "64 bits",
        "8 bits"
      ],
      correct: 1,
      explanation: "All MIPS instructions are 32 bits (4 bytes) long.",
      category: "machine",
      difficulty: "easy"
    },
    {
      question: "How many different instruction formats does MIPS have?",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correct: 1,
      explanation: "MIPS has three instruction formats: R-format, I-format, and J-format.",
      category: "machine",
      difficulty: "easy"
    },
    {
      question: "What is the range of immediate values for I-format instructions?",
      options: [
        "-32,768 to +32,767",
        "-16,384 to +16,383",
        "-65,536 to +65,535",
        "-8,192 to +8,191"
      ],
      correct: 0,
      explanation: "16-bit immediate values are sign-extended, giving a range of -32,768 to +32,767.",
      category: "machine",
      difficulty: "medium"
    },
    {
      question: "Which field in J-format instructions contains the target address?",
      options: [
        "opcode",
        "address",
        "immediate",
        "funct"
      ],
      correct: 1,
      explanation: "The address field (26 bits) in J-format instructions contains the target address.",
      category: "machine",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the 'lw' instruction?",
      options: [
        "100011",
        "101011",
        "100000",
        "101000"
      ],
      correct: 0,
      explanation: "The 'lw' instruction has opcode 100011 (35 in decimal).",
      category: "machine",
      difficulty: "hard"
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
      explanation: "The 'sw' instruction has opcode 101011 (43 in decimal).",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "How is the branch target address calculated in MIPS?",
      options: [
        "PC + immediate",
        "PC + 4 + (immediate << 2)",
        "immediate << 2",
        "PC + (immediate << 2)"
      ],
      correct: 1,
      explanation: "Branch target = PC + 4 + (immediate << 2), where PC+4 is the next instruction address.",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "What is the funct code for the 'sll' instruction?",
      options: [
        "000000",
        "000001",
        "000010",
        "000011"
      ],
      correct: 0,
      explanation: "The 'sll' instruction has funct code 000000 (shift left logical).",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "Which instruction format is used for the 'add' instruction?",
      options: [
        "I-format",
        "J-format",
        "R-format",
        "All formats"
      ],
      correct: 2,
      explanation: "The 'add' instruction uses R-format since it operates on three registers.",
      category: "machine",
      difficulty: "medium"
    },
    {
      question: "What is the funct code for the 'srl' instruction?",
      options: [
        "000000",
        "000001",
        "000010",
        "000011"
      ],
      correct: 2,
      explanation: "The 'srl' instruction has funct code 000010 (shift right logical).",
      category: "machine",
      difficulty: "hard"
    },

    // Pre-Midterm Practice Questions - Single-cycle DataPath
    {
      question: "What is the purpose of the Program Counter (PC) in a MIPS processor?",
      options: [
        "Stores the current instruction",
        "Points to the next instruction to fetch",
        "Stores register values",
        "Controls the ALU"
      ],
      correct: 1,
      explanation: "The PC points to the next instruction to be fetched from memory.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      question: "How many read ports does the MIPS register file have?",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      correct: 1,
      explanation: "The MIPS register file has 2 read ports (for rs and rt) and 1 write port (for rd).",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the ALU in the MIPS datapath?",
      options: [
        "Stores instructions",
        "Performs arithmetic and logical operations",
        "Controls the processor",
        "Manages memory access"
      ],
      correct: 1,
      explanation: "The ALU performs arithmetic and logical operations on data.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      question: "Which component in the datapath handles memory access?",
      options: [
        "Register File",
        "ALU",
        "Data Memory",
        "Control Unit"
      ],
      correct: 2,
      explanation: "The Data Memory component handles load and store operations.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the Instruction Memory in the datapath?",
      options: [
        "Stores data values",
        "Stores and fetches instructions",
        "Performs calculations",
        "Controls the processor"
      ],
      correct: 1,
      explanation: "Instruction Memory stores and provides instructions to the processor.",
      category: "datapath",
      difficulty: "easy"
    },
    {
      question: "How many ALU control lines are needed for the MIPS ALU?",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correct: 2,
      explanation: "The MIPS ALU requires 4 control lines to specify the operation (0000-1111).",
      category: "datapath",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of the sign extension unit?",
      options: [
        "Extends 16-bit immediates to 32 bits",
        "Extends 8-bit values to 32 bits",
        "Extends 32-bit values to 64 bits",
        "Extends addresses to 32 bits"
      ],
      correct: 0,
      explanation: "The sign extension unit extends 16-bit immediate values to 32 bits for ALU operations.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "Which multiplexer selects the second ALU input?",
      options: [
        "ALUSrc",
        "RegDst",
        "MemToReg",
        "Branch"
      ],
      correct: 0,
      explanation: "The ALUSrc multiplexer selects between register data and immediate value for the second ALU input.",
      category: "datapath",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the shift left 2 unit?",
      options: [
        "Shifts addresses left by 2 bits",
        "Shifts data left by 2 bits",
        "Shifts control signals left by 2 bits",
        "Shifts immediates left by 2 bits"
      ],
      correct: 0,
      explanation: "The shift left 2 unit shifts branch addresses left by 2 bits for word-aligned addressing.",
      category: "datapath",
      difficulty: "hard"
    },
    {
      question: "How many cycles does a single-cycle MIPS processor take to execute one instruction?",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      correct: 0,
      explanation: "A single-cycle processor executes one instruction per clock cycle.",
      category: "datapath",
      difficulty: "easy"
    },

    // Pre-Midterm Practice Questions - Single-cycle Control
    {
      question: "How many main control signals does the MIPS control unit generate?",
      options: [
        "6",
        "7",
        "8",
        "9"
      ],
      correct: 2,
      explanation: "The main control unit generates 8 control signals: RegDst, ALUSrc, MemToReg, RegWrite, MemRead, MemWrite, Branch, and Jump.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal determines the destination register?",
      options: [
        "ALUSrc",
        "RegDst",
        "MemToReg",
        "RegWrite"
      ],
      correct: 1,
      explanation: "RegDst selects between rt (0) and rd (1) for the destination register.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "What is the value of RegDst for R-type instructions?",
      options: [
        "0",
        "1",
        "X (don't care)",
        "Depends on the instruction"
      ],
      correct: 1,
      explanation: "R-type instructions use rd as the destination, so RegDst = 1.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "What is the value of ALUSrc for load instructions?",
      options: [
        "0",
        "1",
        "X (don't care)",
        "Depends on the instruction"
      ],
      correct: 1,
      explanation: "Load instructions use immediate values for address calculation, so ALUSrc = 1.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal enables writing to the register file?",
      options: [
        "RegDst",
        "ALUSrc",
        "RegWrite",
        "MemWrite"
      ],
      correct: 2,
      explanation: "RegWrite enables writing to the register file when set to 1.",
      category: "control",
      difficulty: "easy"
    },
    {
      question: "What is the value of MemToReg for R-type instructions?",
      options: [
        "0",
        "1",
        "X (don't care)",
        "Depends on the instruction"
      ],
      correct: 0,
      explanation: "R-type instructions write ALU result to register, so MemToReg = 0.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "Which control signal enables reading from data memory?",
      options: [
        "MemRead",
        "MemWrite",
        "RegWrite",
        "Branch"
      ],
      correct: 0,
      explanation: "MemRead enables reading from data memory for load instructions.",
      category: "control",
      difficulty: "easy"
    },
    {
      question: "What is the value of Branch for beq instructions?",
      options: [
        "0",
        "1",
        "X (don't care)",
        "Depends on the condition"
      ],
      correct: 1,
      explanation: "Branch instructions set Branch = 1 to enable branch control logic.",
      category: "control",
      difficulty: "medium"
    },
    {
      question: "How many ALU operation codes are needed for MIPS?",
      options: [
        "4",
        "8",
        "16",
        "32"
      ],
      correct: 2,
      explanation: "The ALU control unit generates 4-bit operation codes (0000-1111) for 16 different operations.",
      category: "control",
      difficulty: "hard"
    },
    {
      question: "What is the ALU operation code for the AND operation?",
      options: [
        "0000",
        "0001",
        "0010",
        "0011"
      ],
      correct: 0,
      explanation: "The AND operation has ALU operation code 0000.",
      category: "control",
      difficulty: "hard"
    },

    // Pre-Midterm Practice Questions - Building Blocks and Memory Arrays
    {
      question: "What is the purpose of a multiplexer in digital circuits?",
      options: [
        "Performs arithmetic operations",
        "Selects one of multiple inputs",
        "Stores data values",
        "Controls timing"
      ],
      correct: 1,
      explanation: "A multiplexer selects one of multiple inputs based on control signals.",
      category: "building_blocks",
      difficulty: "easy"
    },
    {
      question: "How many inputs does a 2-to-1 multiplexer have?",
      options: [
        "2",
        "3",
        "4",
        "5"
      ],
      correct: 1,
      explanation: "A 2-to-1 multiplexer has 2 data inputs, 1 select input, and 1 output (3 total inputs).",
      category: "building_blocks",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of a decoder in digital circuits?",
      options: [
        "Converts binary to decimal",
        "Converts one-hot encoding to binary",
        "Converts binary to one-hot encoding",
        "Performs logical operations"
      ],
      correct: 2,
      explanation: "A decoder converts binary input to one-hot output (only one output line is active).",
      category: "building_blocks",
      difficulty: "medium"
    },
    {
      question: "How many output lines does a 3-to-8 decoder have?",
      options: [
        "3",
        "6",
        "8",
        "9"
      ],
      correct: 2,
      explanation: "A 3-to-8 decoder has 8 output lines (2^3 = 8 possible combinations).",
      category: "building_blocks",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of an encoder in digital circuits?",
      options: [
        "Converts binary to decimal",
        "Converts one-hot encoding to binary",
        "Converts binary to one-hot encoding",
        "Performs arithmetic operations"
      ],
      correct: 1,
      explanation: "An encoder converts one-hot input to binary output (opposite of decoder).",
      category: "building_blocks",
      difficulty: "medium"
    },
    {
      question: "What is the capacity of a 1K x 8 memory array?",
      options: [
        "1,024 bits",
        "8,192 bits",
        "1,024 bytes",
        "8,192 bytes"
      ],
      correct: 1,
      explanation: "1K x 8 = 1,024 words × 8 bits/word = 8,192 bits total capacity.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "How many address lines are needed for a 1K memory array?",
      options: [
        "8",
        "10",
        "12",
        "16"
      ],
      correct: 1,
      explanation: "1K = 1,024 = 2^10, so 10 address lines are needed.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of a memory decoder?",
      options: [
        "Decodes memory addresses",
        "Decodes memory data",
        "Decodes control signals",
        "Decodes instruction opcodes"
      ],
      correct: 0,
      explanation: "A memory decoder decodes address lines to select specific memory locations.",
      category: "memory",
      difficulty: "medium"
    },
    {
      question: "What is the access time of a memory array?",
      options: [
        "Time to write data",
        "Time to read data",
        "Time to decode addresses",
        "Time to refresh data"
      ],
      correct: 1,
      explanation: "Access time is the time required to read data from memory after an address is provided.",
      category: "memory",
      difficulty: "easy"
    },
    {
      question: "What is the purpose of a tri-state buffer?",
      options: [
        "Amplifies signals",
        "Provides three output states",
        "Controls signal direction",
        "Stores data temporarily"
      ],
      correct: 1,
      explanation: "A tri-state buffer can output high, low, or high-impedance (disconnected) states.",
      category: "building_blocks",
      difficulty: "hard"
    },

    // Pre-Midterm Practice Questions - Advanced Topics
    {
      question: "What is the purpose of the BNE (Branch if Not Equal) instruction?",
      options: [
        "Branches if two registers are equal",
        "Branches if two registers are not equal",
        "Branches if a register is zero",
        "Branches if a register is negative"
      ],
      correct: 1,
      explanation: "BNE branches if the two source registers are not equal.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the BNE instruction?",
      options: [
        "000100",
        "000101",
        "000110",
        "000111"
      ],
      correct: 1,
      explanation: "The BNE instruction has opcode 000101 (5 in decimal).",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "How is the branch target address calculated for BNE?",
      options: [
        "PC + immediate",
        "PC + 4 + (immediate << 2)",
        "immediate << 2",
        "PC + (immediate << 2)"
      ],
      correct: 1,
      explanation: "Branch target = PC + 4 + (immediate << 2), same as other branch instructions.",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "What is the purpose of the ADD instruction in MIPS?",
      options: [
        "Adds two registers and stores result in a third",
        "Adds a register and immediate value",
        "Adds two immediate values",
        "Adds memory addresses"
      ],
      correct: 0,
      explanation: "ADD adds two source registers and stores the result in a destination register.",
      category: "assembly",
      difficulty: "easy"
    },
    {
      question: "What is the funct code for the ADD instruction?",
      options: [
        "100000",
        "100010",
        "100100",
        "100101"
      ],
      correct: 0,
      explanation: "The ADD instruction has funct code 100000 (32 in decimal).",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "Which instruction format does ADD use?",
      options: [
        "I-format",
        "J-format",
        "R-format",
        "All formats"
      ],
      correct: 2,
      explanation: "ADD uses R-format since it operates on three registers.",
      category: "machine",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the JAL (Jump and Link) instruction?",
      options: [
        "Jumps to an address",
        "Jumps and saves return address",
        "Jumps if a condition is met",
        "Jumps and loads a value"
      ],
      correct: 1,
      explanation: "JAL jumps to an address and saves the return address in $ra.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the opcode for the JAL instruction?",
      options: [
        "000000",
        "000010",
        "000011",
        "000100"
      ],
      correct: 2,
      explanation: "The JAL instruction has opcode 000011 (3 in decimal).",
      category: "machine",
      difficulty: "hard"
    },
    {
      question: "Which register does JAL use to store the return address?",
      options: [
        "$sp",
        "$fp",
        "$ra",
        "$gp"
      ],
      correct: 2,
      explanation: "JAL stores the return address in the $ra (return address) register.",
      category: "assembly",
      difficulty: "medium"
    },
    {
      question: "What is the purpose of the JR (Jump Register) instruction?",
      options: [
        "Jumps to an immediate address",
        "Jumps to an address in a register",
        "Jumps if a condition is met",
        "Jumps and saves return address"
      ],
      correct: 1,
      explanation: "JR jumps to the address stored in a register (typically $ra for function returns).",
      category: "assembly",
      difficulty: "medium"
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

// Debug: Log quiz questions count
console.log('🔍 study-data.js loaded');
console.log('📊 Quiz questions count:', studyData.quiz ? studyData.quiz.length : 'undefined');
console.log('📊 First quiz question:', studyData.quiz ? studyData.quiz[0]?.question : 'undefined');