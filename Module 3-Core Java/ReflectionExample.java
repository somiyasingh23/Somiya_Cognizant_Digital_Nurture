import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        
        Class<?> cls = Class.forName("Reflection");

        
        Object obj = cls.getDeclaredConstructor().newInstance();

        
        Method[] methods = cls.getDeclaredMethods();


        for (Method method : methods) {
            System.out.print("Method: " + method.getName() + "(");
            Parameter[] params = method.getParameters();
            for (int i = 0; i < params.length; i++) {
                System.out.print(params[i].getType().getSimpleName());
                if (i < params.length - 1) System.out.print(", ");
            }
            System.out.println(")");
        }

    
        Method greetMethod = cls.getMethod("greet");
        greetMethod.invoke(obj);

        
        Method messageMethod = cls.getMethod("showMessage", String.class);
        messageMethod.invoke(obj, "This is dynamic reflection!");
    }
}
