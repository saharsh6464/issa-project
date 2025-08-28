package com.shreyas.DSA.CONTEST.Service;
import com.shreyas.DSA.CONTEST.DTO.SubmitResponse;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import java.util.concurrent.*;

@Service
public class SubmissionQueueService {

    private final BlockingQueue<Runnable> queue = new LinkedBlockingQueue<>();
    private final ExecutorService workers = Executors.newFixedThreadPool(3); // max 5 concurrent jobs

    public Future<SubmitResponse> submit(Callable<SubmitResponse> job) {
        CompletableFuture<SubmitResponse> future = new CompletableFuture<>();

        // Wrap the Callable inside a Runnable
        queue.add(() -> {
            try {
                SubmitResponse result = job.call(); // call your method
                future.complete(result);            // complete the future
            } catch (Exception e) {
                future.completeExceptionally(e);   // if error, complete exceptionally
            }
        });

        return future;
    }

    @PostConstruct
    public void start() {
        for (int i = 0; i < 5; i++) {
            workers.submit(() -> {
                while (true) {
                    try {
                        Runnable job = queue.take();
                        job.run();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            });
        }
    }
}
