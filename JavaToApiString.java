import java.util.Scanner;

public class JavaToApiString {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringBuilder inputCode = new StringBuilder();

        System.out.println("Paste your Java code (end with a line containing only END):");

        while (true) {
            String line = sc.nextLine();
            if (line.equals("END")) break;
            inputCode.append(line).append("\n");
        }

        // Escape for JSON only
        String escapedCode = inputCode.toString()
                .replace("\\", "\\\\")   // escape backslashes
                .replace("\"", "\\\"")   // escape quotes
                .replace("\n", "\\n");   // replace newlines

        // Wrap in JSON
        String jsonReady = "{\n  \"text\": \"" + escapedCode + "\"\n}";

        System.out.println("\nAPI-ready JSON string:");
        System.out.println(jsonReady);
    }
}
